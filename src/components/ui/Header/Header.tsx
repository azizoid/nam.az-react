import { lazy, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot as asd } from '@fortawesome/free-solid-svg-icons';

const MapModal = lazy(() => import('ui/MapModal/MapModal'));

export type HeaderProps = {
  changeCity: (city: number) => void;
  city?: number;
};

export const Header = ({ changeCity, city }: HeaderProps) => {
  const [showModal, setShowModal] = useState(!city);
  const [showQibla, setShowQibla] = useState(false);

  return (
    <div className="bg-gray-100 py-2 px-2">
      <nav className="flex justify-between container mx-auto">
        <a
          className="py-2 flex items-center content-start text-gray-500 hover:opacity-75"
          href="/"
        >
          <img
            src="/favicon.png"
            width="30"
            height="30"
            alt="nam.az"
            className="mr-2"
          />
          Nam.az
        </a>

        <div className="flex flex-col">
          <button
            className="bg-green-500 text-white active:bg-green-600 text-sm py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Xəritə <FontAwesomeIcon icon={asd} beat transform="shrink-2" />
          </button>
          <MapModal
            open={showModal}
            onClose={() => city && setShowModal(false)}
            showQibla={showQibla}
            toggleQibla={() => setShowQibla(prev => !prev)}
            onClick={changeCity}
            setShowModal={setShowModal}
            selectedCity={city}
          />

          <small>
            Bakı, Gəncə, <u>Şuşa</u> və digər
          </small>
        </div>
      </nav>
    </div>
  );
};