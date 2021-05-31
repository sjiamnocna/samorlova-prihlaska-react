const fetchData = async (data) => {
  console.log(data);
  return fetch("/prihlaska/", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
  });
}

export default fetchData;