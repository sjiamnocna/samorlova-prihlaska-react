const fetchData = async (data) =>
  fetch("/prihlaska", {
    crossDomain: true,
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(data),
  });

export default fetchData;