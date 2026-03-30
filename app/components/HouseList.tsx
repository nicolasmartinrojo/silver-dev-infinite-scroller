import HouseComponent from "./House";

interface props {
  houses: House[];
}

export default function HouseList(props: props) {
  return (
    <ul>
      {props.houses.map((h) => (
        <HouseComponent {...h} key={h.id} />
      ))}
    </ul>
  );
}
