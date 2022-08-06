import Navigation from "../components/Navigation";
import BaseCard from "../components/BaseCard";
import BaseMessage from "../components/BaseMessage";
import { useState } from "react";

import rus from "../data/rus.json";
import uzb from "../data/uzb.json";
import us from "../data/us.json";

function MainPage() {
  const [contacts, setContacts] = useState([]);
  const [region, setRegion] = useState(uzb);
  let tempContacts = [];
  function setCountry(reg) {
    setRegion(reg);
  }
  function generateFullName(country) {
    let randName = Math.floor(Math.random() * country.names.length);
    let randMidName = Math.floor(Math.random() * country.middleNames.length);
    let randLastName = Math.floor(Math.random() * country.lastNames.length);
    return [
      country.names[randName],
      country.middleNames[randMidName],
      country.lastNames[randLastName],
    ].join(" ");
  }

  function generateAddress(country) {
    let randCity = Math.floor(Math.random() * country.cities.length);
    let randStreet = Math.floor(Math.random() * country.streets.length);
    let randHouse = Math.floor(Math.random() * 1000);
    let randApartment = Math.floor(Math.random() * 1000);
    return [
      `${country.cities[randCity]} city`,
      `${country.streets[randStreet]} street`,
      `${randHouse} / ${randApartment}`,
    ].join(", ");
  }

  function generatePhone(country) {
    let phone = "";
    let randCode = Math.floor(Math.random() * country.phoneCodes.length);
    phone += country.phoneCodes[randCode];
    for (let i = 0; i < 7; i++) {
      const randInt = Math.floor(Math.random() * 10);
      phone += randInt;
    }
    return phone;
  }

  function generateContacts(country, num) {
    for (let i = 0; i < num; i++) {
      let temp = [];
      temp.push(Math.random() * 9999999999);
      temp.push(generateFullName(country));
      if (country === uzb) {
        temp.push("Uzbekistan");
      }
      if (country === rus) {
        temp.push("Russia");
      }
      if (country === us) {
        temp.push("United States");
      }
      temp.push(generatePhone(country));
      temp.push(generateAddress(country));
      tempContacts.push(temp);
      setContacts(tempContacts);
    }
  }

  return (
    <div>
      <Navigation />
      <section>
        <BaseCard>
          <h1>Random Contact</h1>
          <h5>Choose the contact's country</h5>
          <div className="">
            <button
              className={
                region === uzb ? "btn btn-success" : "btn btn-secondary"
              }
              onClick={() => {
                setCountry(uzb);
              }}
            >
              Uzbekistan
            </button>
            <button
              className={
                region === rus ? "btn btn-success" : "btn btn-secondary"
              }
              onClick={() => {
                setRegion(rus);
              }}
            >
              Russia
            </button>
            <button
              className={
                region === us ? "btn btn-success" : "btn btn-secondary"
              }
              onClick={() => {
                setRegion(us);
              }}
            >
              USA
            </button>
          </div>
          <label htmlFor="customRange3" className="form-label">
            Probability of mistakes
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="10"
            step="0.01"
            defaultValue="0"
            id="customRange3"
          ></input>
          <button
            className="btn btn-primary"
            onClick={() => {
              generateContacts(region, 10);
            }}
          >
            Generate
          </button>
        </BaseCard>
        {contacts.map((contact) => (
          <BaseMessage
            key={contact[0]}
            fullName={contact[1]}
            country={contact[2]}
            phone={contact[3]}
            address={contact[4]}
          />
        ))}
      </section>
    </div>
  );
}
export default MainPage;
