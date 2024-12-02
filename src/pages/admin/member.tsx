import Container from "@/components/admin/container";
import ProkerList from "@/components/admin/proker/proker-list";
import ProkerCreate from "@/components/admin/proker/proker-create";
import { useState } from "react";

export default function Member() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  return (
    <>
      <h1>Program Kerja</h1>
      <Container>
        <ProkerCreate
          setIsLoadingForm={setIsLoadingForm}
          isLoadingForm={isLoadingForm}
        />
      </Container>
      <Container>
        <ProkerList isLoadingForm={isLoadingForm} />
      </Container>
    </>
  );
}
