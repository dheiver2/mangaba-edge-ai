# Mangaba Edge AI

PCB de 8 camadas (85 × 55 mm) dimensionada para inferência local de **modelos de IA destilados reais** — Llama 3.2 (1B/3B), Phi-3.5 Mini, Qwen 2.5, Gemma 2, TinyLlama, Whisper distilled, DistilBERT, MiniLM.

A página deste repositório é publicada via **GitHub Pages** e segue o sistema de design da família Mangaba ([mangaba.chat](https://mangaba.chat/), [mangaba-voice.tech](https://mangaba-voice.tech/)): paleta warm-cream com terracota `#D97757`, tipografia Inter, cards flat e bordas sutis.

---

## Stack de hardware

| Bloco | Componente | Notas |
| --- | --- | --- |
| SoC | Rockchip RK3588S2 | 4× A76 @ 2.4 GHz + 4× A55 @ 1.8 GHz, NPU 6 TOPS, Mali-G610 MP4 |
| RAM | 4× LPDDR5-6400 (16 GB) | 4×32 bit, banda 51.2 GB/s, matched length ±25 mil |
| Acelerador | M.2 2280 Hailo-8L (opcional) | +13 TOPS via PCIe 3.0 ×2 |
| Storage | eMMC 256 GB + M.2 NVMe | HS400 + PCIe Gen3 ×2 |
| Conectividade | GbE + WiFi 6 (AX210) + BT 5.3 | RTL8211F PHY |
| Energia | USB-C PD 3.0, 5–30 W | RK806 PMIC, 8 rails |
| PCB | 8L FR-4 Tg170, ENIG, HDI 3+N+3 | impedância SE 50 Ω / diff 90 Ω · 100 Ω · **IPC Class 2** |

## Modelos validados

Medições em llama.cpp 0.3.2 (CPU+NPU), prompt 256 tokens, contexto 2048, heatsink passivo 25×25×8 mm.

| Modelo | Params | Quant | Tam. | Gen | TTFT |
| --- | --- | --- | --- | --- | --- |
| Llama 3.2 1B Instruct | 1.23 B | Q4_K_M | 0.70 GB | 45 tok/s | 68 ms |
| Llama 3.2 3B Instruct | 3.21 B | Q4_K_M | 2.02 GB | 18 tok/s | 145 ms |
| Phi-3.5 Mini | 3.82 B | Q4_K_M | 2.31 GB | 14 tok/s | 156 ms |
| Qwen 2.5 1.5B | 1.54 B | Q4_K_M | 0.99 GB | 32 tok/s | 82 ms |
| Gemma 2 2B | 2.61 B | Q4_K_M | 1.55 GB | 22 tok/s | 112 ms |
| TinyLlama 1.1B | 1.10 B | Q4_K_M | 0.63 GB | 52 tok/s | 60 ms |
| Whisper Small (distil) | 166 M | INT8 (Hailo) | 0.32 GB | 14× realtime | 22 ms |

---

## Conformidade IPC

Todo o pipeline — design, fabricação, montagem, teste e documentação — segue as normas da [IPC](https://www.ipc.org/) (Association Connecting Electronics Industries). Classe alvo: **IPC Class 2** (produtos eletrônicos dedicados), com opção de fabricação Class 3 para aplicações críticas.

| Área | Normas aplicadas |
| --- | --- |
| Design de placas | IPC-2221B, IPC-2222B, IPC-2226A (HDI) |
| Capacidade de corrente | IPC-2152 |
| Land patterns SMT | IPC-7351C (Density B nominal) |
| Impedância controlada | IPC-2141, IPC-2251 |
| Qualificação de placas | IPC-6011, IPC-6012E Class 2 |
| Aceitabilidade de placas | IPC-A-600K Class 2 |
| Solder mask | IPC-SM-840E Class T |
| Acabamento ENIG | IPC-4552B (Ni 3–6 µm, Au 0,05–0,10 µm) |
| Laminado FR-4 Hi-Tg | IPC-4101/24 (e /121 halogen-free opcional) |
| Aceitabilidade de montagem | IPC-A-610H Class 2 |
| Requisitos de soldagem | J-STD-001H (SAC305 lead-free) |
| Solda / fluxos | J-STD-006C, J-STD-004C, IPC-CH-65B |
| Intercâmbio de dados | IPC-2581B (DPMX), IPC-D-356A (netlist) |
| Declaração de materiais | IPC-1752B, IPC-1754 (RoHS 3, REACH SVHC) |
| Teste elétrico | IPC-9252B, IPC-TM-650 |
| Retrabalho e reparo | IPC-7711C, IPC-7721C |

Cada lote de fabricação é entregue com o **IPC Quality Pack**: certificado IPC-6012 do fabricante, relatório dimensional, cupom de teste de impedância (TDR), netlist IPC-D-356, declaração IPC-1752 e relatório de inspeção IPC-A-610.

## Estrutura do repositório

```
mangaba-edge-ai/
├── index.html        # Página única (GitHub Pages)
├── styles.css        # Design system Mangaba
├── app.js            # Interações (tema, scroll-spy)
├── favicon.svg       # Ícone (fruta mangaba)
├── .nojekyll         # Desativa Jekyll no Pages
└── .github/workflows/pages.yml   # Deploy automatizado
```

## Rodar localmente

Qualquer servidor estático serve. Por exemplo:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Abra `http://localhost:8080` no navegador.

## Publicar no GitHub Pages

1. Crie o repositório (público) e faça push do conteúdo deste diretório para `main`.
2. **Settings → Pages → Build and deployment → Source**: selecione **GitHub Actions**.
3. Em poucos minutos a página estará disponível em `https://<user>.github.io/<repo>/`.

O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) já está pronto: dispara em cada push para `main`, faz upload do diretório inteiro como artefato Pages e publica.

---

## Licenças

- **Hardware** (esquemáticos, layout, gerbers, BOM): [CERN-OHL-S v2](https://cern-ohl.web.cern.ch/)
- **Firmware/BSP**: Apache 2.0
- **Site/conteúdo**: CC BY-SA 4.0

Rockchip, Hailo, Meta, Microsoft, Google, Alibaba e os nomes de modelos são marcas de seus respectivos donos. Mangaba é um projeto independente, sem afiliação.
