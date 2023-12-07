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
						<MText className='text-base text-slate-400'>160 Pennsylvania Ave NW, Washington, Castle, PA 16101-5161</MText>
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
						<MText className='text-base text-slate-400'>vietthang11012002@gmail.com</MText>
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
				<Map
					googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places'
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</MCol>
		</MRow>
	);
};
export default ContactComponent;
