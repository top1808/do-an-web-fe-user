'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product, ProductSKU } from '@/models/productModels';
import { addingItemToCart } from '@/redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { customMoney, getProductPrice } from '@/utils/FunctionHelpers';
import CustomPriceProduct from '../components/CustomPriceProduct';
import ProductDescription from '../components/ProductDescription';
import ProductRelative from '../components/ProductRelative';
import ProductImageWrap from '../components/ProductImageWrap';
import ProductOptions from '../components/ProductOptions';
import { changeMainImage, setDefaultOption } from '@/redux/reducers/productReducer';
import { useSearchParams } from 'next/navigation';
import EvaluateProduct from '../components/EvaluateProduct';
import Link from 'next/link';
import MInputQuantity from '@/components/MInputQuantity';
interface DetailProductComponent {
	productInfor?: Product;
}
type ProductSKUChoice = {
	product: ProductSKU | null;
	discountValue: number;
	price: number;
	promotionPrice?: number;
	dateEnd?: string;
	isPercent?: boolean;
};
const DetailProductComponent: React.FC<DetailProductComponent> = (props) => {
	const { productInfor } = props;
	const product = useAppSelector((state) => state.product);
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const [productSKU, setProductSKU] = useState<ProductSKUChoice>({ product: null, discountValue: 0, price: 0 });
	const [quantity, setQuantity] = useState<number>(1);
	const searchParams = useSearchParams();

	function handleAddToCart() {
		const data = {
			...productSKU.product,
			productId: productInfor?._id,
			quantity: quantity,
			price: productSKU.promotionPrice ? productSKU.promotionPrice : productSKU.price,
		};
		session ? dispatch(addingItemToCart(data as Product)) : toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng !');
	}
	useEffect(() => {
		if (product.options.length === productInfor?.groupOptions?.length) {
			const findProductSKU = productInfor?.productSKUList?.find((item) => {
				const optionsProduct = item.options?.map((option) => option.option);
				if (product.options.every((element, index) => element === optionsProduct[index])) {
					return item;
				}
				return null;
			});
			if (findProductSKU) {
				const productDiscount = productInfor?.discounts?.find((item) => item.productSKUBarcode === findProductSKU.barcode);
				if (productDiscount && productDiscount.status) {
					setProductSKU({
						product: findProductSKU,
						promotionPrice: productDiscount.promotionPrice!,
						price: productDiscount.price!,
						discountValue: productDiscount.value!,
						isPercent: productDiscount.type === 'percent' ? true : false,
					});
				} else {
					setProductSKU({ product: findProductSKU, price: findProductSKU.price || 0, discountValue: 0 });
				}
			} else {
				setProductSKU({ product: null, discountValue: 0, price: 0 });
			}
		}
	}, [product.options, productInfor?.discounts, productInfor?.groupOptions?.length, productInfor?.productSKUList]);
	useEffect(() => {
		if (searchParams.get('barcode')) {
			const productWithBarcode = productInfor?.productSKUList?.find((p) => p.barcode === searchParams.get('barcode'));
			if (productWithBarcode) {
				dispatch(setDefaultOption([...productWithBarcode.options.map((option) => option.option!)]));
			}
		} else {
			dispatch(setDefaultOption(Array.from({ length: productInfor?.groupOptions?.length || 2 }, () => '')));
		}
	}, [dispatch, productInfor, productInfor?.groupOptions?.length, searchParams]);

	useEffect(() => {
		dispatch(changeMainImage(productInfor?.images?.[0] || ''));
	}, [dispatch, productInfor?.images]);

	return (
		<>
			<div className='p-8 shadow-md bg-white'>
				<MRow gutter={12}>
					<MCol
						lg={8}
						xs={24}
					>
						<ProductImageWrap images={productInfor?.images || []} />
					</MCol>
					<MCol
						lg={16}
						xs={24}
						className='flex flex-col justify-between'
					>
						<div>
							<MTitle level={3}>{productInfor?.name}</MTitle>
							<div className='flex gap-8'>
								<Rate
									allowHalf
									defaultValue={productInfor?.rate || 5}
									disabled
								/>
								{productSKU.product && <div className='text-xl'>{`Đã bán: ${productSKU?.product?.inventory.soldQuantity} sản phẩm`}</div>}
							</div>
							<CustomPriceProduct
								oldPrice={productInfor?.promotionPrice ? productInfor?.price : null}
								price={productSKU.price > 0 ? customMoney(productSKU.price) : getProductPrice(productInfor as Product)}
								discountValue={productSKU.discountValue > 0 ? productSKU.discountValue : null}
								promotionPrice={productSKU.promotionPrice ? productSKU.promotionPrice : null}
								isPercent={productSKU.isPercent}
							/>
							<ProductOptions groupOptions={productInfor?.groupOptions} />
							<div className='pt-4'>
								<MTitle level={3}>Số lượng</MTitle>
								<div className='flex gap-4'>
									<div className='w-[120px]'>
										<MInputQuantity
											className='w-full'
											disabled={productSKU.product && productSKU.product?.inventory.currentQuantity > 0 ? false : true}
											max={productSKU.product ? productSKU.product?.inventory.currentQuantity : 99}
											value={quantity}
											onClickMinus={() => setQuantity(quantity < 2 ? 1 : quantity - 1)}
											onClickPlus={() =>
												setQuantity(
													quantity > (productSKU.product?.inventory.currentQuantity ? productSKU.product?.inventory.currentQuantity - 1 : 98)
														? productSKU.product?.inventory.currentQuantity
															? productSKU.product?.inventory.currentQuantity
															: 99
														: quantity + 1,
												)
											}
											onChange={(value) => {
												setQuantity((value as number) || 1);
											}}
										/>
									</div>
									<div className=' text-center'>{productSKU.product && <p>{`Còn: ${productSKU.product?.inventory.currentQuantity} sản phẩm`}</p>}</div>
								</div>
							</div>
						</div>
						<div className='flex gap-6 pt-4 w-full lg:w-auto'>
							<MButton
								className='bg-green-600 hover:bg-green-300 text-white'
								onClick={() => {
									if ((productInfor?.groupOptions?.length || 0) > 0 && !productSKU.product) {
										toast.warning('Vui lòng chọn loại sản phẩm !');
									} else if (productSKU.product?.inventory.currentQuantity === 0) {
										toast.warning('Sản phẩm này tạm hết hàng ');
									} else {
										handleAddToCart();
									}
								}}
							>
								<FontAwesomeIcon icon={faCartShopping} />
								&nbsp; Thêm vào giỏ hàng
							</MButton>
							<Link
								className='bg-red-400 text-white py-[4px] px-[15px] rounded-lg align-middle hover:opacity-80 hover:text-white'
								href={'/'}
							>
								&nbsp; Mua ngay
							</Link>
						</div>
					</MCol>
				</MRow>
			</div>
			{productInfor?.description && <ProductDescription description={productInfor?.description} />}
			<EvaluateProduct reviews={productInfor?.reviews || []} />
			{product.productsRelative?.length > 0 && <ProductRelative />}
		</>
	);
};

export default DetailProductComponent;
