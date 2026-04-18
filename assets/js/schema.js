// Clean Warks — Organisation schema injected on every page that includes this script
function injectOrganizationSchema() {
  var schema = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "@id": "https://www.cleanwarks.com/#organization",
    "name": "Clean Warks",
    "url": "https://www.cleanwarks.com",
    "logo": "https://www.cleanwarks.com/public/images/clean-warks-logo.png",
    "image": "https://www.cleanwarks.com/public/images/clean-warks-logo.png",
    "telephone": ["+918304000046", "+917034455665"],
    "email": "hello@cleanwarks.com",
    "foundingDate": "2020",
    "priceRange": "₹₹",
    "description": "Professional cleaning services in Kochi, Kottayam, Pathanamthitta, Alappuzha and Bangalore. House cleaning, deep cleaning, sofa, bathroom, kitchen, carpet, water tank and sump cleaning.",
    "areaServed": [
      {"@type": "City", "name": "Kochi"},
      {"@type": "City", "name": "Kottayam"},
      {"@type": "City", "name": "Pathanamthitta"},
      {"@type": "City", "name": "Alappuzha"},
      {"@type": "City", "name": "Bangalore"}
    ],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Kattiparambil Arcade, St. Vincent Convent Road, Palarivattom",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "postalCode": "682025",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "addressCountry": "IN"
      }
    ],
    "geo": {"@type": "GeoCoordinates", "latitude": "10.0053", "longitude": "76.3068"},
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+918304000046",
        "contactType": "customer service",
        "areaServed": "Kerala",
        "availableLanguage": ["English", "Malayalam"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+917034455665",
        "contactType": "customer service",
        "areaServed": "Karnataka",
        "availableLanguage": ["English", "Kannada", "Hindi"]
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "reviewCount": "500"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "House Cleaning Services", "url": "https://www.cleanwarks.com/service/house-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Deep Cleaning Services", "url": "https://www.cleanwarks.com/service/deep-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sofa & Couch Cleaning", "url": "https://www.cleanwarks.com/sofa-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sofa Cleaning Bangalore", "url": "https://www.cleanwarks.com/sofa-cleaning-bangalore/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Bathroom Cleaning Services", "url": "https://www.cleanwarks.com/service/bathroom-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Kitchen Cleaning Services", "url": "https://www.cleanwarks.com/service/kitchen-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Water Tank & Sump Cleaning", "url": "https://www.cleanwarks.com/service/water-tank-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sump Cleaning Bangalore", "url": "https://www.cleanwarks.com/sump-cleaning-bangalore/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Carpet Cleaning Services", "url": "https://www.cleanwarks.com/service/carpet-cleaning-services/"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Office Cleaning Services", "url": "https://www.cleanwarks.com/service/office-cleaning-services/"}}
      ]
    }
  };
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}
injectOrganizationSchema();
