import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  Info,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { PageIntro } from "../components/common/PageIntro";
import { SourceLabel } from "../components/common/SourceLabel";
import { StatusBadge } from "../components/common/StatusBadge";
import { aiUseCases } from "../lib/data";

export function AiPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Mejorar · IA responsable"
        title="IA responsable"
        description="Tres casos de uso propuestos con decisión humana, competencias requeridas, riesgos, controles, beneficios y límites. No hay APIs externas ni modelos conectados a datos reales."
        actions={<Badge tone="violet">3 casos de uso</Badge>}
      />

      <div className="notice notice--academic">
        <Info size={18} aria-hidden="true" />
        <div>
          <strong>Diseño responsable:</strong> la IA solo asiste. La clasificación,
          el escalamiento, la valoración de riesgos y el uso de documentos
          requieren revisión humana. El portal no envía datos a proveedores de IA
          ni ejecuta inferencias automáticas.
        </div>
      </div>

      <div className="mini-stat-grid">
        <div className="mini-stat"><span>Casos de uso</span><strong>{aiUseCases.length}</strong></div>
        <div className="mini-stat"><span>Con decisión humana</span><strong>{aiUseCases.length}</strong></div>
        <div className="mini-stat"><span>Integraciones externas</span><strong>0</strong></div>
        <div className="mini-stat"><span>Datos reales procesados</span><strong>0</strong></div>
      </div>

      <div className="ai-grid">
        {aiUseCases.map((useCase) => (
          <article className="ai-card" key={useCase.id}>
            <div className="ai-card__top">
              <span className="ai-card__id">{useCase.id}</span>
              <Badge tone="violet">SIN API EXTERNA</Badge>
              <StatusBadge status={useCase.evidenceStatus} />
            </div>
            <h3>{useCase.name}</h3>
            <p className="ai-card__purpose">{useCase.purpose}</p>

            <div className="ai-card__workflow">
              <span><Cpu size={15} aria-hidden="true" /> Entradas</span>
              <ul className="compact-list">
                {useCase.inputs.map((input) => <li key={`${useCase.id}-input-${input}`}>{input}</li>)}
              </ul>
              <p><strong>Actividad asistida:</strong> {useCase.assistedActivity}</p>
              <p><strong>Salida esperada:</strong> {useCase.expectedOutput}</p>
            </div>

            <div className="ai-card__human">
              <UserCheck size={17} aria-hidden="true" />
              <div>
                <strong>Decisión humana</strong>
                <p>{useCase.humanDecisionRole}</p>
                <p className="text-muted">Competencia requerida: {useCase.requiredCompetence}</p>
              </div>
            </div>

            <div className="ai-card__sections">
              <section>
                <h4><AlertTriangle size={15} aria-hidden="true" /> Riesgos</h4>
                <ul className="compact-list">
                  {useCase.risks.map((risk) => <li key={`${useCase.id}-risk-${risk}`}>{risk}</li>)}
                </ul>
              </section>
              <section>
                <h4><ShieldCheck size={15} aria-hidden="true" /> Controles</h4>
                <ul className="compact-list">
                  {useCase.controls.map((control) => <li key={`${useCase.id}-control-${control}`}>{control}</li>)}
                </ul>
              </section>
              <section>
                <h4><CheckCircle2 size={15} aria-hidden="true" /> Beneficios</h4>
                <ul className="compact-list">
                  {useCase.benefits.map((benefit) => <li key={`${useCase.id}-benefit-${benefit}`}>{benefit}</li>)}
                </ul>
              </section>
              <section>
                <h4><BookOpen size={15} aria-hidden="true" /> Límites</h4>
                <ul className="compact-list">
                  {useCase.limits.map((limit) => <li key={`${useCase.id}-limit-${limit}`}>{limit}</li>)}
                </ul>
              </section>
            </div>

            <div className="callout callout--muted">
              <strong>Datos:</strong> {useCase.dataHandling}
            </div>
            <SourceLabel source={useCase} compact />
          </article>
        ))}
      </div>

      <section className="panel" aria-labelledby="lineas-ia">
        <div className="panel__header">
          <div>
            <h2 id="lineas-ia">Líneas de uso responsable</h2>
            <p>Reglas aplicables a cualquier futura implementación.</p>
          </div>
        </div>
        <ul className="bullet-list">
          <li>Minimizar datos: solo información ficticia o sanitizada.</li>
          <li>Mantener supervisión humana y registro de la decisión final.</li>
          <li>Verificar referencias documentales antes de usar una respuesta.</li>
          <li>No modificar automáticamente matrices, registros ni valoraciones.</li>
          <li>Documentar limitaciones y sesgos potenciales en cada caso de uso.</li>
          <li>No conectar el portal con servicios externos sin evaluación formal.</li>
        </ul>
      </section>
    </div>
  );
}
