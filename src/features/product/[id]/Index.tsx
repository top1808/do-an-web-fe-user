'use client';
import MButton from '@/components/MButton';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MTitle from '@/components/MTitle';
import { faCartShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Product } from '@/models/productModels';
import { addingItemToCart } from '@/redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { customMoney, getProductPrice, handleFormatterInputNumber, handleParserInputNumber } from '@/utils/FunctionHelpers';
import CustomPriceProduct from '../components/CustomPriceProduct';
import ProductDescription from '../components/ProductDescription';
import ProductRelative from '../components/ProductRelative';
import ProductImageWrap from '../components/ProductImageWrap';
import ProductOptions from '../components/ProductOptions';
import { resetOptions, setDefaultOption } from '@/redux/reducers/productReducer';
import { useSearchParams } from 'next/navigation';
interface DetailProductComponent {
	productInfor?: Product;
}
type ProductSKUChoice = {
	product: Product | null;
	discountValue: number;
	price: number;
	promotionPrice?: number;
	dateEnd?: string;
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
				const productDiscount = productInfor.discounts?.find((item) => item.productSKUBarcode === findProductSKU.barcode);
				if (productDiscount && productDiscount.status) {
					setProductSKU({ product: findProductSKU, promotionPrice: productDiscount.promotionPrice!, price: productDiscount.price!, discountValue: productDiscount.value! });
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
			dispatch(resetOptions(productInfor?.groupOptions?.length));
		}
	}, [dispatch, productInfor, productInfor?.groupOptions?.length, searchParams]);
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
							<CustomPriceProduct
								oldPrice={productInfor?.promotionPrice ? productInfor?.price : null}
								price={productSKU.price > 0 ? customMoney(productSKU.price) : getProductPrice(productInfor as Product)}
								discountValue={productSKU.discountValue > 0 ? productSKU.discountValue : null}
								promotionPrice={productSKU.promotionPrice ? productSKU.promotionPrice : null}
							/>
							<ProductOptions groupOptions={productInfor?.groupOptions} />
							<div className='pt-4'>
								<MTitle level={3}>Số lượng</MTitle>
								<InputNumber
									min={1}
									max={9999}
									formatter={handleFormatterInputNumber}
									parser={handleParserInputNumber}
									onChange={(value) => {
										value ? setQuantity(value) : setQuantity(1);
									}}
									value={quantity}
								/>
							</div>
						</div>
						<div className='flex gap-4 pt-4 w-full lg:w-auto'>
							<MButton
								className='bg-green-600 hover:bg-green-300 text-white'
								onClick={handleAddToCart}
								disabled={(productInfor?.groupOptions?.length || 0) > 0 && !productSKU.product}
							>
								<FontAwesomeIcon icon={faCartShopping} />
								&nbsp; Thêm vào giỏ hàng
							</MButton>
							<MButton
								className='bg-red-400 text-white'
								onClick={() => {}}
							>
								<FontAwesomeIcon icon={faCheck} />
								&nbsp; Mua ngay
							</MButton>
						</div>
					</MCol>
				</MRow>
			</div>
			{productInfor?.description && <ProductDescription description={productInfor?.description} />}
			<ProductRelative />
		</>
	);
};

export default DetailProductComponent;
