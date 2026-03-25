import { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => setUsers(res.data));
  }, []);

  // 🔍 Search Filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔃 Sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;

    let valA = sortField === "company" ? a.company.name : a[sortField];
    let valB = sortField === "company" ? b.company.name : b[sortField];

    return order === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  return (
    <div>
      <h1>User Dashboard</h1>

      <SearchBar setSearch={setSearch} />

      <UserTable
        users={sortedUsers}
        setSortField={setSortField}
        setOrder={setOrder}
        order={order}
      />
    </div>
  );
}

export default Dashboard;