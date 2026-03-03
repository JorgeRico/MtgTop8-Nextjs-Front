// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

export default function HeaderRightBlock({ image, text, endpoint }) {
    // const { t } = useTranslation();

    return (
        <>
            <div className="pointer ml20 left">
                {/* <Link to={endpoint}> */}
                    <div className="left pt2">
                        {/* <img src={image} alt={`${text} - ${t('header.mtg legacy')}`} className="send invertColor" width="20" height="20" /> */}
                        imagen
                    </div>
                    <div className="left ml10 headerRight">
                        {text}
                    </div>
                {/* </Link> */}
            </div>
        </>
    );
}