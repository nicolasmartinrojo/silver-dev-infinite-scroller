import Button from "@mui/material/Button";
import { ArrowUpIcon } from "lucide-react";

export default function HouseComponent(props: House) {
  return (
    <article className="group w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="grid gap-6 p-6 sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:items-center">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-slate-100 shadow-sm shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-900">
          <img
            src={props.photoURL}
            alt={`House at ${props.address}`}
            className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500 dark:text-sky-400">
              Featured home
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {props.address}
            </h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Owned by{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {props.homeowner}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-100">
              ${props.price.toLocaleString()}
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Nuevo
            </span>
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-center gap-3 sm:items-end">
          <Button variant="contained" size="medium" className="min-w-[140px]">
            Contactar
          </Button>
          <Button variant="outlined" size="medium" className="min-w-[140px]">
            Ver detalles
          </Button>
          <Button variant="outlined" size="medium" endIcon={<ArrowUpIcon />}>
            Enviar
          </Button>
        </div>
      </div>
    </article>
  );
}
