import React, { createContext, useState } from "react";

export const SlotsContext = createContext();
export const SlotsProvider = props => {
  const { children } = props;
  const [monday, setMonday] = useState({});
  const [tuesday, setTuesday] = useState({});
  const [wednesday, setWednesday] = useState({});
  const [thursday, setThursday] = useState({});
  const [friday, setFriday] = useState({});
  const [saturday, setSaturday] = useState({});
  const [sunday, setSunday] = useState({});

  const [bookingSlotsContext, setBookinSlotsContext] = useState([
    {
      day: "MONDAY",
      slots: []
    },
    {
        day: "TUESDAY",
        slots: []
      },
      {
        day: "WEDNESDAY",
        slots: []
      },
      {
        day: "THURSDAY",
        slots: []
      },
      {
        day: "FRIDAY",
        slots: []
      },
      {
        day: "SATURDAY",
        slots: []
      },
      {
        day: "SUNDAY",
        slots: []
      }
  ]);

  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <SlotsContext.Provider
      value={{
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        setMonday,
        setTuesday,
        setWednesday,
        setThursday,
        setFriday,
        setSaturday,
        sunday,
        setSunday,
        bookingSlotsContext,
        setBookinSlotsContext,
        isUpdated,
        setIsUpdated
      }}
    >
      {children}
    </SlotsContext.Provider>
  );
};
