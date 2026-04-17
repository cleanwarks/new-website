// Clean Warks — Organisation schema injected on every page
function injectOrganizationSchema() {
  var schema = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "Clean Warks",
    "url": "https://cleanwarks.com",
    "logo": "https://cleanwarks.com/wp-content/uploads/2024/03/Clean-Warks-Logo-no-back-1.png",
    "image": "https://cleanwarks.com/wp-content/uploads/2024/03/Clean-Warks-Logo-no-back-1.png",
    "telephone": "+918304000046",
    "email": "cleanwarks@gmail.com",
    "foundingDate": "2020",
    "description": "Professional cleaning services in Kochi, Kottayam, Pathanamthitta, Alappuzha and Bangalore. House cleaning, deep cleaning, sofa, bathroom, kitchen, carpet and water tank cleaning.",
    "areaServed": [
      {"@type":"City","name":"Kochi"},
      {"@type":"City","name":"Kottayam"},
      {"@type":"City","name":"Pathanamthitta"},
      {"@type":"City","name":"Alappuzha"},
      {"@type":"City","name":"Bangalore"}
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kattiparambil Arcade, St. Vincent Convent Road, Palarivattom",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "postalCode": "682025",
      "addressCountry": "IN"
    },
    "geo": {"@type":"GeoCoordinates","latitude":"10.0053","longitude":"76.3068"},
    "contactPoint": [
      {"@type":"ContactPoint","telephone":"+918304000046","contactType":"customer service","areaServed":"Kerala","availableLanguage":["English","Malayalam"]},
      {"@type":"ContactPoint","telephone":"+917034455665","contactType":"customer service","areaServed":"Karnataka","availableLanguage":["English","Kannada","Hindi"]}
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","bestRating":"5","reviewCount":"500"},
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"House Cleaning Services"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Deep Cleaning Services"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Sofa & Couch Cleaning"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Bathroom Cleaning Services"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Kitchen Cleaning Services"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Water Tank & Sump Cleaning"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Carpet Cleaning Services"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Office Cleaning Services"}}
      ]
    }
  };
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}
injectOrganizationSchema();
