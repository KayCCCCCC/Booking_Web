import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ICarouselItem } from "./CarouselItem";

type CarouselCustomProps = {
  items: ICarouselItem[];
};
const CarouselCustom = ({ items }: CarouselCustomProps) => {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 bg-main rounded ">
                  {item.content}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      {/* <CarouselNext /> */}
    </Carousel>
  );
};

export default CarouselCustom;
