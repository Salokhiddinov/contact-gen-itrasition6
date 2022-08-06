import { ExportToCsv } from "export-to-csv";

function BaseMessage(props) {
  function exportToCSV(name, country, phone, address) {
    let data = [
      {
        name: name,
        country: country,
        phone: phone,
        address: address,
      },
    ];
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Contact",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }
  return (
    <div className="message card">
      <h3>{props.fullName}</h3>
      <div className="info">
        <div>
          <p>Country: {props.country}</p>
          <p>Phone: {props.phone}</p>
          <p>Address: {props.address}</p>
        </div>
        <button
          onClick={() => {
            exportToCSV(
              props.fullName,
              props.country,
              props.phone,
              props.address
            );
          }}
          className="btn btn-info"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}
export default BaseMessage;
