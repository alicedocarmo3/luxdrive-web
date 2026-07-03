import "../styles/Terms.css";
import { ArrowLeft, Shield, FileText, Car, CreditCard, Wrench, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="terms-page">
  

      <div className="terms-container">
        <div className="terms-hero">
          <Shield size={48} />
          <h1>Termos de Serviço</h1>
          <p>Última atualização: 02 de julho de 2026</p>
        </div>

        <div className="terms-content">
          <section>
            <h2><FileText size={20} /> 1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar os serviços da <strong>LegacyDrive</strong>, você concorda em cumprir e 
              estar vinculado aos presentes Termos de Serviço. Caso não concorde com qualquer disposição 
              destes termos, solicitamos que não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2><Car size={20} /> 2. Sobre a LegacyDrive</h2>
            <p>
              A LegacyDrive é uma concessionária especializada na comercialização de veículos novos, 
              seminovos e de luxo, oferecendo serviços de venda, financiamento, consórcio, seguros 
              e pós-venda. Nosso objetivo é proporcionar uma experiência premium na aquisição do seu 
              veículo.
            </p>
          </section>

          <section>
            <h2><CreditCard size={20} /> 3. Cadastro e Conta de Usuário</h2>
            <p>
              Para utilizar determinados serviços, é necessário criar uma conta fornecendo informações 
              verdadeiras, precisas e atualizadas. Você é responsável por manter a confidencialidade de 
              sua senha e por todas as atividades realizadas em sua conta. A idade mínima para cadastro 
              é de <strong>18 (dezoito) anos</strong>.
            </p>
          </section>

          <section>
            <h2><Wrench size={20} /> 4. Serviços Oferecidos</h2>
            <ul>
              <li><strong>Venda de Veículos:</strong> Comercialização de veículos novos, seminovos certificados e modelos de luxo.</li>
              <li><strong>Financiamento e Consórcio:</strong> Parcerias com instituições financeiras para facilitar a aquisição.</li>
              <li><strong>Seguros:</strong> Corretagem de seguros veiculares em parceria com seguradoras.</li>
              <li><strong>Pós-Venda:</strong> Serviços de manutenção, reparos, revisões e venda de peças e acessórios originais.</li>
              <li><strong>Test Drive:</strong> Agendamento de testes drive mediante apresentação de documentação válida.</li>
            </ul>
          </section>

          <section>
            <h2><AlertTriangle size={20} /> 5. Condições de Uso</h2>
            <p>O usuário se compromete a:</p>
            <ul>
              <li>Fornecer informações verdadeiras e atualizadas;</li>
              <li>Não utilizar os serviços para fins ilegais ou não autorizados;</li>
              <li>Não tentar acessar áreas restritas do sistema sem autorização;</li>
              <li>Respeitar os prazos e condições de pagamento estabelecidos;</li>
              <li>Comparecer aos agendamentos realizados ou cancelar com antecedência mínima de 24 horas.</li>
            </ul>
          </section>

          <section>
            <h2>6. Preços e Pagamentos</h2>
            <p>
              Os preços dos veículos e serviços estão sujeitos a alterações sem aviso prévio. 
              As condições de pagamento, taxas de juros e encargos serão informadas no momento da 
              proposta comercial. A LegacyDrive reserva-se o direito de corrigir eventuais erros 
              de preços antes da conclusão da venda.
            </p>
          </section>

          <section>
            <h2>7. Garantia e Pós-Venda</h2>
            <p>
              Os veículos novos possuem garantia de fábrica conforme especificações do fabricante. 
              Veículos seminovos certificados pela LegacyDrive possuem garantia limitada de acordo 
              com o programa de certificação. Serviços de manutenção e reparos seguem as normas 
              técnicas dos fabricantes.
            </p>
          </section>

          <section>
            <h2>8. Cancelamento e Devolução</h2>
            <p>
              O direito de arrependimento (Lei nº 8.078/90) aplica-se exclusivamente a contratos 
              firmados fora do estabelecimento comercial, nos termos da legislação vigente. 
              Para serviços de manutenção agendados, o cancelamento deve ser comunicado com 
              antecedência mínima de 24 horas.
            </p>
          </section>

          <section>
            <h2>9. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponível no site e aplicativos da LegacyDrive — incluindo textos, 
              imagens, logotipos, marcas, vídeos e software — é de propriedade exclusiva da LegacyDrive 
              ou de seus licenciadores, sendo protegido pelas leis de propriedade intelectual.
            </p>
          </section>

          <section>
            <h2>10. Limitação de Responsabilidade</h2>
            <p>
              A LegacyDrive não se responsabiliza por danos indiretos, incidentais ou consequenciais 
              resultantes do uso ou impossibilidade de uso dos serviços, exceto nos casos de dolo 
              ou culpa grave comprovada.
            </p>
          </section>

          <section>
            <h2>11. Alterações nos Termos</h2>
            <p>
              A LegacyDrive poderá alterar estes Termos a qualquer momento. As alterações entrarão 
              em vigor imediatamente após sua publicação. Recomendamos a revisão periódica desta página.
            </p>
          </section>

          <section>
            <h2>12. Legislação Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer 
              controvérsias serão dirimidas pelo foro da comarca onde está localizada a sede da 
              LegacyDrive, com renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2>13. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos de Serviço, entre em contato conosco pelo e-mail: 
              <strong> juridico@legacydrive.com.br</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
