import Container from "@/components/admin/container";
import DinasCreate from "@/components/admin/dinas/dinas-create";
import DinasList from "@/components/admin/dinas/dinas-list";
import { useState } from "react";

export default function Dinas() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  return (
    <>
      <h1>Dinas</h1>
      <Container>
        <DinasCreate
          setIsLoadingForm={setIsLoadingForm}
          isLoadingForm={isLoadingForm}
        />
      </Container>
      <Container>
        <DinasList isLoadingForm={isLoadingForm} />
      </Container>
    </>
  );
}
