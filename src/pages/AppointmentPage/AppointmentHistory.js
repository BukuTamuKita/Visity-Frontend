import React, { 
  useState, 
  useEffect,
  useMemo, 
} from "react";
import axios from "axios";
import { DELETE_APPOINTMENT, JWT_HEADER, SHOW_APPOINTMENT, UPDATE_APPOINTMENT } from '../../constants/urls';
import Table from "../../components/Table/Table";
import { isLogin } from "../../utils/auth";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

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
          }
        }
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
      headers: { Authorization: `Bearer ${JWT_HEADER}` },
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

  const cancelAppointment = (id, note) => {
    axios.put(
      UPDATE_APPOINTMENT(id),
      {
        headers: {Authorization: `Bearer ${JWT_HEADER}`},
        data: {
          notes: note,
        }
      }
    )
  };

  const deleteAppointment = (id) => {
    axios.delete(DELETE_APPOINTMENT(id), {
      headers: {
        Authorization: `Bearer ${JWT_HEADER}`
      }
    })
  };

  const appointmentsData = useMemo(() => [...appointments], [appointments]);
  const appointmentsColumn = useMemo(() => [...columns], [columns]);

  console.log(appointments);

  return (
      <div className="py-24 px-16">
        <p className="text-4xl mb-10">Appointment History</p>
        <Table 
          columns={appointmentsColumn} 
          data={appointmentsData} 
          deleteAppointment={deleteAppointment} 
          cancelAppointment={cancelAppointment}
        />
      </div>
  )
}

export default AppointmentHistory;