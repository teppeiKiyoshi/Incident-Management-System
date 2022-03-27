export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstname",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastname",
    headerName: "Last Name",
    width: 170,
  },
  {
    field: "studentID",
    headerName: "Student ID",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 320,
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => {
      return (
        <div className={`cell-status ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data for DATA TABLE IN /users
export const userRows = [
  {
    id: 1,
    firstname: "Catheryn Jay",
    lastname: "Magsusi",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    studentID: "2021987654",
    email: "catherynjaycmagsusi@gmail.com",
    age: 35,
  },
  {
    id: 2,
    firstname: "Jamie",
    lastname: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2007281567",
    email: "cherrymaerecinto@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    firstname: "Jett",
    lastname: "Dela Cruz",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2018123456",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    firstname: "Tony",
    lastname: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "20187654321",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    firstname: "Peter",
    lastname: "Parker",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2019546284",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    firstname: "Melisandre",
    lastname: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2020201949",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    firstname: "John Joshua",
    lastname: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2022222222",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    firstname: "Frances",
    lastname: "Italy",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2023456789",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    firstname: "Cypher",
    lastname: "Morocco",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2024681012",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    firstname: "Diana",
    lastname: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    studentID: "2024681012",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];