import Image from 'next/image';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import NotFoundImage from '@/public/not-found.png';
import { ROUTES } from '@/constants/routes';

export default function Custom404() {
  return (
    <div className="not-found-page-wrapper">
      <Image src={NotFoundImage} alt="not-found-image" height={400} width={400} />
      <p className="not-found-page-title">Üzgünüz. Aradığınız sayfa mevcut değil.</p>
      <Button className="btn-back-home" type="primary" icon={<HomeOutlined />} href={ROUTES.HOME}>
				Ana sayfa'ya dön
      </Button>
    </div>
  );
}
