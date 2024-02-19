import axios from "axios";

export async function SearchSubject(query: string = "", page: number = 1) {
  return (
    await axios.post("http://localhost:3001/api/search-subject", {
      query,
      page,
    })
  ).data;
}
