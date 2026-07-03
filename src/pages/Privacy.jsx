import "../styles/Privacy.css";
import { ArrowLeft, Lock, Eye, Database, Share2, UserCheck, Trash2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="privacy-page">
   

      <div className="privacy-container">
        <div className="privacy-hero">
          <Lock size={48} />
          <h1>Política de Privacidade</h1>
          <p>Última atualização: 02 de julho de 2026</p>
        </div>

        <div className="privacy-content">
          <section>
            <h2><Eye size={20} /> 1. Introdução</h2>
            <p>
              A <strong>LegacyDrive</strong> valoriza a privacidade de seus clientes e usuários. 
              Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e 
              protegemos seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção 
              de Dados (Lei nº 13.709/2018 — LGPD)</strong>.
            </p>
          </section>

          <section>
            <h2><Database size={20} /> 2. Dados que Coletamos</h2>
            <p>Podemos coletar os seguintes dados pessoais:</p>
            <ul>
              <li><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento, RG e CNH;</li>
              <li><strong>Dados de contato:</strong> e-mail, telefone, endereço residencial;</li>
              <li><strong>Dados do veículo:</strong> modelo, ano, placa, chassi, número do RENAVAM;</li>
              <li><strong>Dados financeiros:</strong> informações para análise de crédito, score, dados bancários;</li>
              <li><strong>Dados de navegação:</strong> endereço IP, cookies, páginas visitadas, tempo de acesso;</li>
              <li><strong>Dados de interação:</strong> histórico de atendimento, propostas, agendamentos.</li>
            </ul>
          </section>

          <section>
            <h2>3. Como Coletamos seus Dados</h2>
            <p>Seus dados podem ser coletados das seguintes formas:</p>
            <ul>
              <li>Preenchimento de formulários no site ou em nossas concessionárias;</li>
              <li>Interação via chat, WhatsApp, e-mail ou telefone;</li>
              <li>Cadastro para test drive, propostas comerciais ou serviços de pós-venda;</li>
              <li>Uso de cookies e tecnologias similares durante a navegação;</li>
              <li>Parceiros e instituições financeiras, mediante sua autorização.</li>
            </ul>
          </section>

          <section>
            <h2>4. Finalidades do Tratamento</h2>
            <p>Utilizamos seus dados para:</p>
            <ul>
              <li>Processar propostas de venda, financiamento e consórcio;</li>
              <li>Agendar e realizar test drives e serviços de manutenção;</li>
              <li>Emitir notas fiscais e documentação veicular;</li>
              <li>Enviar comunicações sobre produtos, serviços e campanhas promocionais;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Melhorar a experiência do usuário em nossos canais digitais;</li>
              <li>Prevenir fraudes e proteger nossos interesses legítimos.</li>
            </ul>
          </section>

          <section>
            <h2><Share2 size={20} /> 5. Compartilhamento de Dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul>
              <li><strong>Instituições Financeiras:</strong> para análise de crédito e aprovação de financiamentos;</li>
              <li><strong>Seguradoras:</strong> para cotação e contratação de seguros veiculares;</li>
              <li><strong>Prestadores de Serviço:</strong> empresas que auxiliam em nossas operações (tecnologia, marketing, logística);</li>
              <li><strong>Órgãos Públicos:</strong> quando exigido por lei ou ordem judicial;</li>
              <li><strong>Fabricantes:</strong> para registro de garantia e recall.</li>
            </ul>
            <p>
              Todos os terceiros com quem compartilhamos dados estão sujeitos a obrigações de 
              confidencialidade e proteção de dados.
            </p>
          </section>

          <section>
            <h2>6. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo 
              e anúncios, analisar tráfego e entender de onde nossos visitantes vêm. Você pode 
              gerenciar suas preferências de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2>7. Segurança da Informação</h2>
            <p>
              Adotamos medidas técnicas e administrativas adequadas para proteger seus dados pessoais 
              contra acesso não autorizado, perda, destruição, alteração ou vazamento. Isso inclui 
              criptografia, firewalls, controle de acesso e monitoramento contínuo de nossos sistemas.
            </p>
          </section>

          <section>
            <h2>8. Retenção dos Dados</h2>
            <p>
              Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades para 
              as quais foram coletados, bem como para atender obrigações legais, contratuais e 
              regulatórias. Após esse período, os dados são anonimizados ou excluídos de forma segura.
            </p>
          </section>

          <section>
            <h2><UserCheck size={20} /> 9. Seus Direitos como Titular</h2>
            <p>De acordo com a LGPD, você possui os seguintes direitos:</p>
            <ul>
              <li>Confirmação da existência de tratamento de seus dados;</li>
              <li>Acesso aos dados pessoais que mantemos sobre você;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados para outro fornecedor de serviço;</li>
              <li>Revogação do consentimento, quando aplicável;</li>
              <li>Informações sobre entidades com as quais compartilhamos seus dados.</li>
            </ul>
          </section>

          <section>
            <h2><Trash2 size={20} /> 10. Como Exercer seus Direitos</h2>
            <p>
              Para exercer seus direitos, envie um e-mail para 
              <strong> privacidade@legacydrive.com.br</strong> com o assunto 
              <strong> [LGPD] — Solicitação do Titular</strong>, informando seu nome completo, CPF 
              e a ação desejada. Anexe um documento oficial com foto para comprovação de identidade.
            </p>
            <p>
              Responderemos às solicitações em até <strong>15 (quinze) dias</strong>, conforme 
              previsto na legislação.
            </p>
          </section>

          <section>
            <h2>11. Encarregado de Dados (DPO)</h2>
            <p>
              Nosso Encarregado de Proteção de Dados está disponível para esclarecer dúvidas sobre 
              esta política e o tratamento de seus dados pessoais:
            </p>
            <p>
              <strong>E-mail:</strong> dpo@legacydrive.com.br<br />
              <strong>Endereço:</strong> Av. das Concessionárias, 1000 — São Paulo, SP
            </p>
          </section>

          <section>
            <h2>12. Alterações nesta Política</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. As alterações serão 
              publicadas nesta página com a data da última atualização. Recomendamos que você a 
              consulte regularmente.
            </p>
          </section>

          <section>
            <h2><Mail size={20} /> 13. Contato</h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <p>
              <strong>E-mail:</strong> privacidade@legacydrive.com.br<br />
              <strong>Telefone:</strong> (11) 3000-0000<br />
              <strong>Horário de atendimento:</strong> Segunda a sexta, das 8h às 18h
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
