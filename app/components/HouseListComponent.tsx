import HouseComponent from "./HouseComponent";

interface props {
  houses: House[];
}

export default function HouseListComponent(props: props) {
  return (
    <ul>
      {props.houses.map((h) => (
        <HouseComponent {...h} key={h.id} />
      ))}
    </ul>
  );
}
