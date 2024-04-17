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
import { resetOptions } from '@/redux/reducers/productReducer';
interface DetailProductComponent {
	productInfor?: Product;
}

const DetailProductComponent: React.FC<DetailProductComponent> = (props) => {
	const { productInfor } = props;
	const product = useAppSelector((state) => state.product);
	const { data: session } = useSession();
	const dispatch = useAppDispatch();
	const [quantity, setQuantity] = useState<number>(1);
	const [price, setPrice] = useState<number>(0);
	const [productSKU, setProductSKU] = useState<Product | null>(null);
	function handleAddToCart() {
		const data = {
			...productSKU,
			productId: productInfor?._id,
			quantity: quantity,
			price: price,
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
				setProductSKU(findProductSKU);
				setPrice(findProductSKU?.price || 0);
			} else {
				setProductSKU(null);
				setPrice(0);
			}
		}
	}, [product.options, productInfor?.groupOptions?.length, productInfor?.productSKUList]);
	useEffect(() => {
		dispatch(resetOptions(productInfor?.groupOptions?.length));
	}, [dispatch, productInfor?.groupOptions?.length]);
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
								price={price ? customMoney(price) : getProductPrice(productInfor as Product)}
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
								disabled={(productInfor?.groupOptions?.length || 0) > 0 && !productSKU}
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
