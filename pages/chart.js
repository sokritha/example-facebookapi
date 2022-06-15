import CustomLineChart from "../components/line-chart";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";

export default function Chart() {
  return (
    <main className={styles.main}>
      <Container maxWidth="md">
        <CustomLineChart />
      </Container>
    </main>
  );
}
