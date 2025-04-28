export const fetchData = async (file) => {
    const response = await fetch(`/data/${file}`);
    return response.json();
  };
  