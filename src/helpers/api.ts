//http://localhost:5000/data
const URL = "https://dull-teal-skunk-tam.cyclic.cloud/api/data";

export async function getData() {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
export async function changeData(body: any) {
  const res = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
