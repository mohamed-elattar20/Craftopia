import shippingIcon from '../../assets/images/aboutUS/shippingIcon.png'
import supportIcon from '../../assets/images/aboutUS/supportIcon.png'
import secureIcon from '../../assets/images/aboutUS/secureIcon.png'
import returnIcon from '../../assets/images/aboutUS/returnIcon.png'
import { AboutUsCard } from './AboutUsCard'


const AboutUs = () => {

  let aboutUsData = [
    {title: "تغطية لجميع المحافظات", imgSrc: shippingIcon},
    {title: "دعم فني على مدار اليوم", imgSrc: supportIcon},
    {title: "طرق دفع آمنة", imgSrc: secureIcon},
    {title: "ارجاع سهل خلال 14 يوم", imgSrc: returnIcon}
  ]

  let aboutUsCards = aboutUsData.map((cardData) => {
    return <AboutUsCard title={cardData.title} imgSrc={cardData.imgSrc}></AboutUsCard>
  })

  return (
    <section className='container mx-auto row row-cols-xl-4 row-cols-md-2 row-cols-1 py-5 border-bottom g-3'>
      {aboutUsCards}
    </section>
  )
}

export default AboutUs;