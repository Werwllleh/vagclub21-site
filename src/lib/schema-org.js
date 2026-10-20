const BASE_URL = 'https://vagclub21.ru';

export function generateOrganizationAndWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "AutoClub"],
        "@id": `${BASE_URL}/#organization`,
        "name": "VAGClub21",
        "alternateName": "Клуб любителей автомобилей VAG Чебоксары",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/images/og-main.jpg`,
          "width": 1200,
          "height": 630
        },
        "email": "connect@vagclub21.ru",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Чебоксары",
          "addressRegion": "Чувашская Республика",
          "addressCountry": "RU"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Чувашская Республика"
        },
        "sameAs": [
          "https://t.me/+A6S11dagaDA2OWMy",
          "https://www.instagram.com/vag_club21"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "VAGClub21",
        "publisher": {
          "@id": `${BASE_URL}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/cars?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
}

export function generateMeetJsonLd(meet) {
  if (!meet) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": meet.title || "Клубная встреча VAGClub21 Чебоксары",
    "startDate": meet.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": meet.address || "Чебоксары, точка сбора клуба",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Чебоксары",
        "streetAddress": meet.address || "Чебоксары",
        "addressCountry": "RU"
      },
      ...(meet.coordinates?.lat && meet.coordinates?.lng ? {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": meet.coordinates.lat,
          "longitude": meet.coordinates.lng
        }
      } : {})
    },
    "image": [`${BASE_URL}/images/og-main.jpg`],
    "description": "Регулярная сходка участников автоклуба VAGClub21 в Чебоксарах. Общение, клубные фотосессии, обсуждение доработок и новостей сообщества.",
    "offers": {
      "@type": "Offer",
      "url": `${BASE_URL}/meet`,
      "price": "0",
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock"
    },
    "organizer": {
      "@type": "Organization",
      "name": "VAGClub21",
      "url": BASE_URL
    }
  };
}

export function generateCarJsonLd(car, slug) {
  if (!car) return null;

  const serverUrl = process.env.NEXT_PUBLIC_URL_SERVER || BASE_URL;
  const images = (car.carsImages ?? []).map(img => {
    if (!img?.source) return null;
    return img.source.startsWith('http') ? img.source : `${serverUrl}/image/${img.source}`;
  }).filter(Boolean);

  const carName = `${car.brand || ''} ${car.model || ''} ${car.year ? `(${car.year})` : ''}`.trim() || 'Клубный автомобиль VAGClub21';

  return {
    "@context": "https://schema.org",
    "@type": ["Car", "Vehicle"],
    "name": carName,
    "brand": {
      "@type": "Brand",
      "name": car.brand || 'VAG'
    },
    "model": car.model || '',
    ...(car.year ? { "modelDate": String(car.year) } : {}),
    ...(car.number ? { "vehicleIdentificationNumber": car.number } : {}),
    "image": images.length > 0 ? images : [`${BASE_URL}/images/og-main.jpg`],
    "description": car.note || `Автомобиль ${carName} участника сообщества VAGClub21 в г. Чебоксары.`,
    "url": `${BASE_URL}/cars/${slug}`,
    ...(car.drive2 ? { "sameAs": car.drive2 } : {})
  };
}

export function generateProductJsonLd(product, type, slug) {
  if (!product) return null;

  const images = [
    product.mainImage?.url,
    product.image?.url,
    ...(product.gallery ?? []).map(g => g?.url || (typeof g === 'string' ? g : null))
  ].filter(Boolean);

  const productName = product.name || product.title || 'Клубная атрибутика VAGClub21';
  const price = product.pricing?.price || product.price || 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "image": images.length > 0 ? images : [`${BASE_URL}/images/og-main.jpg`],
    "description": product.seo?.description || `Клубный товар ${productName} VAGClub21 Чебоксары.`,
    "sku": `${type}-${slug}`,
    "offers": {
      "@type": "Offer",
      "url": `${BASE_URL}/products/${type}/${slug}`,
      "priceCurrency": "RUB",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock !== false 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "VAGClub21"
      }
    }
  };
}

export function generatePartnerJsonLd(partner, slug) {
  if (!partner) return null;

  const phones = (partner.contacts?.phones ?? []).map(p => p.phone).filter(Boolean);
  const emails = (partner.contacts?.emails ?? []).map(e => e.email).filter(Boolean);
  const images = (partner.gallery ?? []).map(g => g.url).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "name": partner.title || 'Партнер VAGClub21',
    "url": partner.contacts?.site || `${BASE_URL}/partner/${slug}`,
    "image": images.length > 0 ? images : [partner.logo?.url, `${BASE_URL}/images/og-main.jpg`].filter(Boolean),
    ...(partner.logo?.url ? { "logo": partner.logo.url } : {}),
    ...(phones.length > 0 ? { "telephone": phones[0] } : {}),
    ...(emails.length > 0 ? { "email": emails[0] } : {}),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Чебоксары",
      "addressRegion": "Чувашская Республика",
      "streetAddress": partner.address || "г. Чебоксары",
      "addressCountry": "RU"
    },
    ...(partner.coordinates?.lat && partner.coordinates?.lng ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": partner.coordinates.lat,
        "longitude": partner.coordinates.lng
      }
    } : {}),
    "priceRange": "$$",
    "description": partner.description || `${partner.title} — проверенный партнер автоклуба VAGClub21 в г. Чебоксары. Скидка для одноклубников до ${partner.discount || 0}%.`
  };
}

export function generateBreadcrumbsJsonLd(items) {
  if (!items || !items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url?.startsWith('http') ? item.url : `${BASE_URL}${item.url || ''}`
    }))
  };
}
