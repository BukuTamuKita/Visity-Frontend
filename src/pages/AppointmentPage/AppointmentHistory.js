import React, { 
  useState, 
  useEffect,
  useMemo, 
} from "react";
import axios from "axios";
import { 
  DELETE_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  JWT_HEADER, 
  SHOW_APPOINTMENT,
} from '../../constants/urls';
import { useHistory } from "react-router";
import Table from "../../components/Table/Table";
import { getToken, isLogin } from "../../utils/auth";

export const AppointmentAction = ({ id }) => {
  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        Authorization: `Bearer ${JWT_HEADER}`,
    },
  });

  const cancelAppointment = (note) => {
    authAxios.put(UPDATE_APPOINTMENT(id), {
        status: "canceled",
        notes: note,
      }
    )
  };

  const deleteAppointment = () => {
    authAxios.delete(DELETE_APPOINTMENT(id))
  };

  return (
    <>
      <button onClick={() => {
        let value;
        let notes = window.prompt("Enter your notes: ", value);

        if (notes !== null) {
          cancelAppointment(notes);
          window.location.reload();
        }
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <button onClick={() => {
        if (window.confirm("Are you sure want to delete id: " + id + " ?")) {
          deleteAppointment();
          window.location.reload();
        }
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </>
  )
};

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();

  const columns = useMemo(() => 
    [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Host Name",
        accessor: "host.name",
      },
      {
        Header: "Guest Name",
        accessor: "guest.name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          if (value === "accepted") {
            return (
              <div className="text-xs text-center text-green-500 font-semibold py-1 px-2 border rounded-2xl bg-green-100">
                { value }
              </div>
            )
          } else if (value === "declined") {
            return (
              <div className="text-xs text-center text-red-500 font-semibold py-1 px-2 border rounded-2xl bg-red-100">
                { value }
              </div>
            )
          } else if (value === "waiting") {
            return (
              <div className="text-xs text-center text-yellow-500 font-semibold py-1 px-2 border rounded-2xl bg-yellow-100">
                { value }
              </div>
            )
          } else if (value === "canceled") {
            return (
              <div className="text-xs text-center text-gray-500 font-semibold py-1 px-2 border rounded-2xl bg-gray-100">
                { value }
              </div>
            )
          }
        },
      },
      {
        Header: "Purpose",
        accessor: "purpose",
      },
      {
        Header: "Note",
        accessor: "notes",
      },
      {
        Header: "Date",
        accessor: "date_time[0]",
      },
      {
        Header: "Time",
        accessor: "date_time[1]",
      },
    ],
    []
  );

  const fetchAppointments = async () => {
    const response = await axios.get(SHOW_APPOINTMENT, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .catch((err) => console.log(err))

    if (response && isLogin()) {
      const appointments = response.data;

      console.log("appointments: ", appointments);
      setAppointments(response.data.data); 
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // const exportHistory = () => {
  //   axios.get(EXPORT_DATA, {
  //     headers: {
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //     responseType: 'blob',
  //   })
  //   .then(() => {
  //     window.open(EXPORT_DATA);
  //   })
  //   .catch((err) => console.log(err))
  // };

  const appointmentsData = useMemo(() => [...appointments], [appointments]);
  const appointmentsColumn = useMemo(() => [...columns], [columns]);

  return (
      <div className="py-24 px-16">
        <p className="text-4xl mb-10">Appointment History</p>
        <Table 
          columns={appointmentsColumn} 
          data={appointmentsData}
        />
      </div>
  )
}

export default AppointmentHistory;