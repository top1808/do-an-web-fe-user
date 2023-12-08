'use client';
import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MText from '@/components/MText';
import MTitle from '@/components/MTitle';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormContact from './components/FormContact';
import Map from './components/Map';

const ContactComponent = () => {
	return (
		<MRow
			justify='space-between'
			className='bg-white'
		>
			<MCol
				span={11}
				className='py-8 px-4'
			>
				<MRow>
					<MTitle>CONTACT INFO</MTitle>
					<MCol span={24}>
						<MTitle level={4}>
							<FontAwesomeIcon
								color='red'
								icon={faLocationDot}
								className='mr-2'
							/>
							Address
						</MTitle>
						<MText className='text-base text-slate-400'>180 Cao Lỗ, P1, Q8, TP HCM</MText>
					</MCol>
					<MCol span={24}>
						<MTitle level={4}>
							<FontAwesomeIcon
								color='red'
								icon={faLocationDot}
								className='mr-2'
							/>
							Phone
						</MTitle>
						<MText className='text-base text-slate-400'>125-711-811 | 125-668-886</MText>
					</MCol>
					<MCol span={24}>
						<MTitle level={4}>
							<FontAwesomeIcon
								color='red'
								icon={faLocationDot}
								className='mr-2'
							/>
							Support
						</MTitle>
						<MText className='text-base text-slate-400'>example@gmail.com</MText>
					</MCol>
				</MRow>
				<MRow>
					<MCol span={24}>
						<FormContact />
					</MCol>
				</MRow>
			</MCol>
			<MCol
				span={11}
				className='py-8 px-4'
			>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9540679024763!2d106.67529067516757!3d10.738023589408417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad027e3727%3A0x2a77b414e887f86d!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1702029376239!5m2!1svi!2s'
					className='w-full h-screen'
					loading='lazy'
				></iframe>
				{/* <Map
					googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/> */}
			</MCol>
		</MRow>
	);
};
export default ContactComponent;
