'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { faCartShopping, faMoneyCheckDollar, faRotateRight, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product, ProductSKU } from '@/models/productModels';
import { addingItemToCart, getCartState } from '@/redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { compareString, customMoney, getProductPrice, getProductPromotionPrice, getProductsSKUSalesByOneOption } from '@/utils/FunctionHelpers';
import CustomPriceProduct from '../components/CustomPriceProduct';
import ProductDescription from '../components/ProductDescription';
import ProductRelative from '../components/ProductRelative';
import ProductImageWrap from '../components/ProductImageWrap';
import ProductOptions from '../components/ProductOptions';
import { changeMainImage, getProductState, setDefaultOption } from '@/redux/reducers/productReducer';
import { useRouter, useSearchParams } from 'next/navigation';
import EvaluateProduct from '../components/EvaluateProduct';
import MInputQuantity from '@/components/MInputQuantity';
import ListProductsSKUSale from '../components/ListProductsSKUSale';
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
	const { data: session } = useSession();
	const product = useAppSelector(getProductState);
	const cart = useAppSelector(getCartState);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [productSKU, setProductSKU] = useState<ProductSKUChoice>({ product: null, discountValue: 0, price: 0 });
	const [isPayingNow, setIsPayingNow] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);

	function handleAddToCart(isPaying?: boolean) {
		const data = {
			...productSKU.product,
			productId: productInfor?._id,
			quantity: quantity,
			price: productSKU.promotionPrice ? productSKU.promotionPrice : productSKU.price,
		};
		session ? dispatch(addingItemToCart(data as Product)) : toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng !');
		isPaying && setIsPayingNow(true);
	}
	useEffect(() => {
		if (isPayingNow) {
			if (cart.statusUpdate === 'completed') {
				router.push('/cart');
			}
		}
	}, [cart.statusUpdate, router, isPayingNow]);
	useEffect(() => {
		setQuantity(1);
	}, [productSKU.product]);
	useEffect(() => {
		if (product.options.length === productInfor?.groupOptions?.length) {
			const findProductSKU = productInfor?.productSKUList?.find((item) => {
				const optionsProduct = item.options?.map((option) => option.option);
				if (product.options.every((element, index) => compareString(element, optionsProduct[index]))) {
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
					setQuantity(1);
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
				<MRow gutter={[24, 0]}>
					<MCol
						lg={10}
						xs={24}
					>
						<ProductImageWrap images={productInfor?.images || []} />
					</MCol>
					<MCol
						lg={14}
						xs={24}
						className='flex flex-col gap-8'
					>
						<div>
							<MTitle level={3}>{productInfor?.name}</MTitle>
							<div className='flex gap-8'>
								<Rate
									allowHalf
									defaultValue={productInfor?.rate || 5}
									disabled
								/>
								{productSKU.product ? (
									<div className='text-xl'>{`Đã bán: ${productSKU?.product?.inventory.soldQuantity} sản phẩm`}</div>
								) : (
									<div className='text-xl'>{`Đã bán: ${productInfor?.soldQuantityOfProduct} sản phẩm`}</div>
								)}
							</div>
							<div className='flex gap-4 items-center'>
								<CustomPriceProduct
									isProductSKU={productSKU.product ? true : false}
									priceProductDiscount={productInfor?.discounts && productInfor.discounts.length > 0 ? getProductPromotionPrice(productInfor) : undefined}
									oldPrice={productInfor?.promotionPrice ? productInfor?.price : undefined}
									price={productSKU.price > 0 ? customMoney(productSKU.price) : getProductPrice(productInfor as Product)}
									discountValue={productSKU.discountValue > 0 ? productSKU.discountValue : undefined}
									promotionPrice={productSKU.promotionPrice ? productSKU.promotionPrice : undefined}
									isPercent={productSKU.isPercent}
								/>
								{productInfor?.discounts && productInfor.discounts.length > 0 && productInfor.groupOptions && productInfor.groupOptions?.length > 1 && (
									<div>
										<ListProductsSKUSale data={productInfor.discounts} />
									</div>
								)}
							</div>
							<ProductOptions
								groupOptions={productInfor?.groupOptions}
								productsSKUSales={getProductsSKUSalesByOneOption(productInfor)}
							/>
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
						<div className='flex gap-6 py-2 w-full lg:w-auto'>
							<MButton
								size='large'
								type='primary'
								className='bg-green-600 text-white hover:bg-green-300 hover:text-white hover:border-white '
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
								<FontAwesomeIcon
									icon={faCartShopping}
									className='hover:text-white'
								/>
								&nbsp; Thêm vào giỏ hàng
							</MButton>
							<MButton
								size='large'
								type='primary'
								onClick={() => {
									if (productSKU.product) {
										handleAddToCart(true);
									} else {
										toast.warning('Vui lòng chọn loại sản phẩm !');
									}
								}}
								className='bg-red-400 text-white py-[4px] px-[15px] rounded-lg align-middle hover:opacity-80 hover:text-white'
							>
								&nbsp; Mua ngay
							</MButton>
						</div>
						<MRow
							className='my-1'
							gutter={[12, 12]}
						>
							<MCol span={8}>
								<div className='text-center'>
									<FontAwesomeIcon
										icon={faTruckFast}
										size='2xl'
										color='red'
									/>
								</div>
								<div>
									<p className='text-center text-base'>Xem tình trạng giao hàng ở đơn hàng (*)</p>
								</div>
							</MCol>
							<MCol span={8}>
								<div className='text-center'>
									<FontAwesomeIcon
										icon={faRotateRight}
										size='2xl'
										color='blue'
									/>
								</div>
								<div>
									<p className='text-center text-base'>1 đổi 1 trong vòng 3 ngày</p>
								</div>
							</MCol>
							<MCol span={8}>
								<div className='text-center'>
									<FontAwesomeIcon
										icon={faMoneyCheckDollar}
										size='2xl'
										color='red'
									/>
								</div>
								<div>
									<p className='text-center text-base'>Kiếm tra hàng trước khi thanh toán</p>
								</div>
							</MCol>
						</MRow>
					</MCol>
				</MRow>
			</div>
			{productInfor?.description && <ProductDescription description={productInfor?.description} />}
			<EvaluateProduct
				rate={productInfor?.rate || 5}
				reviews={productInfor?.reviews || []}
			/>
			{product.productsRelative?.length > 0 && <ProductRelative />}
		</>
	);
};

export default DetailProductComponent;
