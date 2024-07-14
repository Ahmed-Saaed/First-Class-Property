const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch single property
async function fetchProperty(id) {
  try {
    const resp = await fetch(`${apiDomain}/properties/${id}`);

    // handle the case where the domain is not available yet.

    if (!apiDomain) {
      return null;
    }

    if (!resp.ok) {
      throw new Error('failed to fetch the data ');
    }

    return resp.json();
  } catch (error) {
    return null;
  }
}

async function fetchProperties() {
  try {
    const resp = await fetch(`${apiDomain}/properties`, {cache: 'no-store'});

    // handle the case where the domain is not available yet.

    if (!apiDomain) {
      return [];
    }

    if (!resp.ok) {
      throw new Error('failed to fetch the data ');
    }

    return resp.json();
  } catch (error) {
    console.log('>>>>', process.env.NEXT_PUBLIC_API_DOMAIN, error);
    return [];
  }
}

export {fetchProperty};

export default fetchProperties;
