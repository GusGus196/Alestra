import { useMemo, useState } from "react";
import { Building2, Info, Network, Users } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { DetailDrawer, DetailField, DetailSection } from "../components/common/DetailDrawer";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { DataTable } from "../components/tables/DataTable";
import { FilterBar } from "../components/tables/FilterBar";
import { meta, processes, raci, stakeholders } from "../lib/data";
import { normalizeText } from "../lib/formatters";
import type { RaciRecord, StakeholderRecord } from "../types";

export function OrganizationPage() {
  const [stakeholderSearch, setStakeholderSearch] = useState("");
  const [processFilter, setProcessFilter] = useState("all");
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderRecord | null>(null);
  const [selectedRaci, setSelectedRaci] = useState<RaciRecord | null>(null);

  const processOptions = [
    { value: "all", label: "Todos los procesos" },
    ...[...new Set(raci.map((row) => row.process))].map((value) => ({ value, label: value })),
  ];

  const filteredStakeholders = useMemo(() => {
    const term = normalizeText(stakeholderSearch.trim());
    return stakeholders.filter((item) =>
      !term ||
      normalizeText(`${item.id} ${item.name} ${item.need} ${item.expectation}`).includes(term),
    );
  }, [stakeholderSearch]);

  const filteredRaci = useMemo(
    () => raci.filter((row) => processFilter === "all" || row.process === processFilter),
    [processFilter],
  );

  const accountableRows = raci.filter(
    (row) => row.roles.filter((role) => role.letter === "A").length === 1,
  ).length;

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Planificar · contexto, partes interesadas y gobernanza"
        title="Organización y procesos"
        description="Mapa de procesos del caso académico, partes interesadas, FODA y matriz RACI propuesta. Los responsables se expresan por rol: no se asignan nombres ni cargos reales no documentados."
        actions={<StatusBadge status="pendiente_validacion" />}
      />

      <div className="notice notice--academic">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Alcance del SGI:</strong> {meta.project.scope} La RACI y las
          fichas de proceso son propuestas derivadas del expediente disponible.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Procesos mapeados</span><strong>{processes.length}</strong></div>
        <div className="mini-stat"><span>Partes interesadas</span><strong>{stakeholders.length}</strong></div>
        <div className="mini-stat"><span>Actividades RACI</span><strong>{raci.length}</strong></div>
        <div className="mini-stat"><span>Actividades con una sola A</span><strong>{accountableRows}/{raci.length}</strong></div>
      </div>

      <section aria-labelledby="mapa-procesos">
        <div className="section-heading">
          <h3 id="mapa-procesos">Mapa de procesos</h3>
          <span className="section-heading__hint">Estratégico, misional, apoyo y transversal</span>
        </div>
        <div className="process-grid">
          {processes.map((process) => (
            <article className="process-card" key={process.id}>
              <div className="process-card__top">
                <span className="process-card__id">{process.id}</span>
                <StatusBadge status={process.evidenceStatus} />
              </div>
              <h4>{process.name}</h4>
              <p>{process.objective}</p>
              <dl className="process-card__meta">
                <div><dt>Tipo</dt><dd>{process.type}</dd></div>
                <div><dt>Responsable</dt><dd>{process.owner}</dd></div>
                <div><dt>Riesgos</dt><dd>{process.relatedRisks.join(", ") || "Sin vincular"}</dd></div>
                <div><dt>Indicadores</dt><dd>{process.relatedKpis.join(", ") || "Sin vincular"}</dd></div>
              </dl>
              <div className="process-card__flow">
                <strong>Entradas → actividades → salidas</strong>
                <span>{process.inputs.join(" · ")}</span>
                <span>{process.activities.join(" → ")}</span>
                <span>{process.outputs.join(" · ")}</span>
              </div>
              {process.gaps.length > 0 && (
                <p className="process-card__gap"><strong>Pendiente:</strong> {process.gaps.join("; ")}</p>
              )}
              <SourceLabel source={process} compact />
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="interesados-title">
        <div className="panel__header">
          <div>
            <h2 id="interesados-title">Partes interesadas</h2>
            <p>Necesidades, expectativas y requisitos documentados o pendientes de completar.</p>
          </div>
          <Users size={19} aria-hidden="true" />
        </div>
        <FilterBar
          search={stakeholderSearch}
          onSearch={setStakeholderSearch}
          searchPlaceholder="Buscar parte interesada…"
          resultLabel={`${filteredStakeholders.length} de ${stakeholders.length}`}
        />
        <DataTable<StakeholderRecord>
          compact
          rowKey={(row) => row.id}
          rows={filteredStakeholders}
          onRowClick={setSelectedStakeholder}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "name", header: "Parte interesada", render: (row) => row.name },
            { key: "need", header: "Necesidad", render: (row) => <span className="clamp-2">{row.need}</span> },
            { key: "process", header: "Proceso", render: (row) => row.relatedProcess },
            { key: "status", header: "Estado", render: (row) => <StatusBadge status={row.evidenceStatus} /> },
          ]}
        />
      </section>

      <section className="panel" aria-labelledby="raci-title">
        <div className="panel__header">
          <div>
            <h2 id="raci-title">Matriz RACI propuesta</h2>
            <p>R realiza, A responde y aprueba, C consulta, I informa. Una sola A por actividad.</p>
          </div>
          <Network size={19} aria-hidden="true" />
        </div>
        <FilterBar
          search=""
          onSearch={() => undefined}
          searchPlaceholder="Filtrar por proceso en el selector"
          filters={[{ label: "Proceso", value: processFilter, onChange: setProcessFilter, options: processOptions }]}
          resultLabel={`${filteredRaci.length} de ${raci.length} actividades`}
        />
        <DataTable<RaciRecord>
          compact
          rowKey={(row) => row.id}
          rows={filteredRaci}
          onRowClick={setSelectedRaci}
          columns={[
            { key: "id", header: "ID", render: (row) => <strong>{row.id}</strong> },
            { key: "activity", header: "Actividad", render: (row) => row.activity },
            { key: "process", header: "Proceso", render: (row) => row.process },
            {
              key: "roles",
              header: "Roles",
              render: (row) => (
                <div className="chip-row">
                  {row.roles.map((role) => (
                    <span className={`chip chip--raci-${role.letter.toLowerCase()}`} key={`${row.id}-${role.role}`}>
                      <strong>{role.letter}</strong> {role.role}
                    </span>
                  ))}
                </div>
              ),
            },
            { key: "status", header: "Estado", render: (row) => <StatusBadge status={row.evidenceStatus} /> },
          ]}
        />
      </section>

      <section className="panel" aria-labelledby="foda-title">
        <div className="panel__header">
          <div>
            <h2 id="foda-title">Contexto FODA</h2>
            <p>Fortalezas, oportunidades, debilidades y amenazas del expediente académico.</p>
          </div>
          <Building2 size={19} aria-hidden="true" />
        </div>
        <div className="foda-grid">
          {meta.foda.map((group) => (
            <article className="foda-card" key={group.category}>
              <div>
                <h3>{group.category}</h3>
                <Badge tone="neutral">{group.type}</Badge>
              </div>
              <ul className="compact-list">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <DetailDrawer
        open={Boolean(selectedStakeholder)}
        onClose={() => setSelectedStakeholder(null)}
        eyebrow={selectedStakeholder ? `${selectedStakeholder.id} · parte interesada` : undefined}
        title={selectedStakeholder?.name ?? ""}
      >
        {selectedStakeholder && (
          <>
            <div className="detail-badges">
              <StatusBadge status={selectedStakeholder.evidenceStatus} />
              <Badge tone="blue">{selectedStakeholder.relatedProcess}</Badge>
            </div>
            <DetailSection title="Relación con el SGI">
              <dl className="detail-grid">
                <DetailField label="Necesidad">{selectedStakeholder.need}</DetailField>
                <DetailField label="Expectativa">{selectedStakeholder.expectation}</DetailField>
                <DetailField label="Requisito">{selectedStakeholder.requirement}</DetailField>
                <DetailField label="Responsable por rol">{selectedStakeholder.owner}</DetailField>
                <DetailField label="Evidencia">{selectedStakeholder.evidence}</DetailField>
                <DetailField label="Brechas">
                  {selectedStakeholder.gaps.length > 0 ? selectedStakeholder.gaps.join("; ") : "Sin vincular"}
                </DetailField>
              </dl>
            </DetailSection>
            <SourceLabel source={selectedStakeholder} />
          </>
        )}
      </DetailDrawer>

      <DetailDrawer
        open={Boolean(selectedRaci)}
        onClose={() => setSelectedRaci(null)}
        eyebrow={selectedRaci ? `${selectedRaci.id} · matriz RACI` : undefined}
        title={selectedRaci?.activity ?? ""}
      >
        {selectedRaci && (
          <>
            <div className="detail-badges"><StatusBadge status={selectedRaci.evidenceStatus} /></div>
            <DetailSection title="Asignación por rol">
              <dl className="detail-grid">
                {selectedRaci.roles.map((role) => (
                  <DetailField key={`${selectedRaci.id}-${role.role}`} label={`${role.letter} · ${role.role}`}>
                    {role.letter === "A"
                      ? "Único responsable de la aprobación de la actividad"
                      : role.letter === "R"
                        ? "Ejecuta la actividad"
                        : role.letter === "C"
                          ? "Consulta técnica o de seguridad"
                          : "Recibe información del resultado"}
                  </DetailField>
                ))}
              </dl>
            </DetailSection>
            <DetailSection title="Notas">
              <p>{selectedRaci.notes}</p>
            </DetailSection>
            <SourceLabel source={selectedRaci} />
          </>
        )}
      </DetailDrawer>
    </div>
  );
}
