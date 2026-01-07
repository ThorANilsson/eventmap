import { WikipediaSummary } from "@/types/wikipediaSummary";
import { ExternalLink, FlaskConical } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

export default function WikipediaSummaryCard({
  wikipedia,
}: {
  wikipedia: WikipediaSummary;
}) {
  return (
    <>
      <div className="flex flex-col gap-2 p-3 bg-muted border">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <FontAwesomeIcon icon={faWikipediaW} size="lg" />
            <p className="font-medium text-xl">{wikipedia.title}</p>
          </div>
          <Button asChild variant="outline" size="icon">
            <Link href={wikipedia.pageUrl}>
              <ExternalLink />
            </Link>
          </Button>
        </div>
        <p>{wikipedia.extract}</p>
      </div>
      <ExperimentalDisclaimer />
    </>
  );
}

function ExperimentalDisclaimer() {
  return (
    <div className="flex flex-row items-center gap-3 bg-muted p-2 border">
      <div>
        <FlaskConical className="h-5 w-5" />
      </div>
      <p className="font-medium text-sm">
        Wikipedia summary is an experimental feature that may show irrelevant
        information.
      </p>
    </div>
  );
}
