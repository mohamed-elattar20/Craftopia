import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

export const Footer = () => {
    return (
        <footer className='container mx-auto py-5'>
            <div className='row text-center text-md-end g-5'>
                <ul className='list-unstyled fw-medium px-0 col-12 col-md-8 col-xl-5'>
                    <li>
                        <h5 className='fw-semibold mb-4'>كرافتوبيا</h5>
                    </li>
                    <li>
                        <p>منصة الكترونية لربط أصحاب المواهب بمحبي الأعمال اليدوية</p>
                    </li>
                </ul>
                <ul className='list-unstyled fw-medium px-0 col-12 col-md-4 col-xl-3'>
                    <li>
                        <h5 className='fw-semibold mb-4'>روابط مفيدة</h5>
                    </li>
                    <li>
                        <p>الاسئلة الشائعة</p>
                    </li>
                    <li>
                        <p>الاحكام والشروط</p>
                    </li>
                    <li>
                        <p>سياسة الخصوصية</p>
                    </li>
                    <li>
                        <p>سياسة الاستبدال و الاسترجاع</p>
                    </li>
                    <li>
                        <p>شروط البيع</p>
                    </li>
                </ul>
                <ul className='list-unstyled fw-medium px-0 col-12 col-md-8 col-xl-3'>
                    <li>
                        <h5 className='fw-semibold mb-4'>تحتاج مساعده؟</h5>
                    </li>
                    <li>
                        <p>تواصل معنا</p>
                    </li>
                    <li>
                        <p><FontAwesomeIcon icon={faEnvelope} /> support.center@craftopia.com</p>
                    </li>
                    <li>
                        <p><FontAwesomeIcon icon={faPhone} /> 00201000406896</p>
                    </li>
                </ul>
                <ul className='list-unstyled fw-medium px-0 col-12 col-md-4 col-xl-1'>
                    <li>
                        <h5 className='fw-semibold mb-4'>تابعونا على</h5>
                    </li>
                    <li className='d-flex gap-4 justify-content-center justify-content-md-start'>
                        <FontAwesomeIcon icon={faInstagram} className="text-primary" />
                        <FontAwesomeIcon icon={faTwitter} className="text-primary" />
                        <FontAwesomeIcon icon={faFacebookF} className="text-primary" />
                    </li>
                </ul>
            </div>
        </footer >
    )
}
