import { Link } from "react-router-dom";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import ProgramCard from "../ProgramCard";
import BreadcrumpCard from "../BreadcrumpCard";
import { setBreadCrumb } from "@/lib/networks/breadCrumbQueries";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../ui/carousel";
import { rndImage } from "@/lib/genImage";
import { getProkerData } from "@/lib/networks/prokerQueries";

type Props = {
  name: string;
  nav: any;
  event_format: string;
  dinas: string;
  date: string;
  description: string;
  benefits: any;
  assets: any;
};

export default function ProkerDetailItem({
  name,
  nav,
  event_format,
  dinas,
  date,
  description,
  benefits,
  assets,
}: Props) {
  const [prokerDinas, setProkerDinas] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const prokerData = await getProkerData();
    const filteredProker = prokerData
      ?.flat()
      .filter((e: any) => e["dinas"] === dinas && e["name"] !== name);
    setProkerDinas(filteredProker ?? []);
  }

  useEffect(() => {
    if (prokerDinas.length > 3) setPrograms(rndImage({ array: prokerDinas }));
    else setPrograms(prokerDinas);
  }, [prokerDinas]);

  return (
    <section className="flex flex-col gap-8">
      <div>
        <BreadcrumpCard page={"Proker HMIF"} linkPage={"proker"}>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="capitalize"
              href="/proker"
              onClick={() => setBreadCrumb(nav)}
            >
              {nav}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <ArrowRight />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-primary">
              {name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumpCard>
      </div>

      <div className="flex flex-col gap-4">
        <p className="inline-block w-fit rounded bg-primary px-3 py-1 text-white">
          {event_format}
        </p>
        <h1 className="text-4xl">{name}</h1>
        <div className="flex gap-2">
          <p>Presented by</p>
          <p className="uppercase">{dinas}</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full flex-col gap-4 lg:w-3/4">
            <Carousel>
              <CarouselContent>
                {assets
                  // .filter((e: any, key: any) => key >= 0)
                  .map((asset: any, key: number) => (
                    <CarouselItem key={key} className="max-w-full">
                      <img
                        src={import.meta.env.VITE_SUPABASE_BUCKET_URL + asset}
                        alt={asset}
                        className="center h-[500px] w-full bg-center object-cover"
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
            <div className="flex w-full flex-col gap-2">
              <div className="flex justify-start gap-2 py-2 text-primary">
                <Clock />
                <p>{date}</p>
              </div>
              <p>{description}</p>
              <div>
                <p>Benefits:</p>
                <ul className="px-12">
                  {benefits.map((benefit: any, key: number) => (
                    <li className="list-disc" key={key}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {prokerDinas.length > 0 && (
        <section className="mt-10 flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-bold uppercase text-primary xl:text-4xl">
            Our Programs
          </h1>
          <p className="my-8 w-full text-center md:w-3/4">
            “Memulai petualangan untuk terhubung dengan teman sebaya, para
            profesional, dan pengalaman pendidikan di seluruh kampus, dan
            temukan berbagai kesempatan yang menanti Anda!”
          </p>
          <div className="flex flex-col lg:flex-row">
            {programs &&
              programs
                .flat()
                .map((item: any, key: any) => (
                  <ProgramCard
                    key={key}
                    eventFormat={item["event_format"]}
                    name={item["name"]}
                    date={item["date"]}
                    description={item["description"]}
                    dinas={item["dinas"]}
                    src={undefined}
                    type={"proker"}
                  />
                ))}
          </div>
          <Link
            to={"/proker"}
            className="text flex items-center justify-center gap-2 font-semibold text-primary"
          >
            <p className="text-xl lg:text-2xl">See More Our Programs</p>
            <ArrowRight className="size-8" />
          </Link>
        </section>
      )}
      <img
        src="/img/proker-ellipse-1.png"
        alt="proker-ellipse-1"
        className="absolute -bottom-[120%] right-0 -z-50 w-3/4 md:-bottom-[40%] md:w-1/2 lg:-bottom-[140%] lg:w-1/3"
      />
    </section>
  );
}
