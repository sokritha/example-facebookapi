import CustomLineChart from "../components/line-chart";
import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import History from "@content/history.json";
import SummaryCard from "@components/summary-card";

export default function Chart() {
  return (
    <main className={styles.main}>
      <Container maxWidth="md">
        <SummaryCard />
        <CustomLineChart history={History} />
      </Container>
    </main>
  );
}
