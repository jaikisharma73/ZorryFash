import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const policies = [
        {
            icon: assets.exchange_icon,
            title: 'Easy Exchange',
            desc: 'Hassle-free exchanges within 7 days of delivery. No questions asked.',
        },
        {
            icon: assets.quality_icon,
            title: '7-Day Returns',
            desc: 'Not satisfied? Return any item within 7 days for a full refund.',
        },
        {
            icon: assets.support_img,
            title: '24/7 Support',
            desc: 'Our dedicated team is here to help you around the clock, every day.',
        },
    ];

    return (
        <div ref={sectionRef} className='py-20'>
            <div className={`section-title-wrapper animate-on-scroll ${isVisible ? 'visible' : ''}`}>
                <p className="section-label">Why Choose Us</p>
                <h2 className="section-heading playfair">Built on Trust & Quality</h2>
                <div className="section-line" />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {policies.map((policy, index) => (
                    <div
                        key={index}
                        className={`policy-card text-center animate-on-scroll stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
                    >
                        <div className="policy-icon">
                            <img src={policy.icon} className='w-6' alt={policy.title} />
                        </div>
                        <p className='font-semibold text-gray-800 text-sm mb-2'>{policy.title}</p>
                        <p className='text-gray-400 text-xs leading-relaxed'>{policy.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurPolicy
