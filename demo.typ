// =============================================================
// 03-code-and-math.typ — Code Blocks and Math
// =============================================================
// What you'll learn:
//   - Inline code with backticks
//   - Fenced code blocks with language syntax highlighting
//   - Raw blocks via #raw()
//   - Inline math ($...$)
//   - Display math ($ ... $ with spaces)
// Ref: https://typst.app/docs/reference/text/raw/
// Ref: https://typst.app/docs/reference/math/
// =============================================================

= Acme Widget API — Code Examples & Formulas

// ---- Inline code ----
// Surround text with single backticks: `code`.

== Inline Code

Every widget has a unique `widget_id` string. Pass it to the
`GET /widgets/{widget_id}` endpoint to fetch details. The
response content type is `application/json`.

// ---- Fenced code blocks ----
// Use triple backticks with a language name for syntax
// highlighting. The language name goes right after the
// opening backticks, with no space.

== Python Example

Fetch a widget using the Python SDK:

```python
import acme

client = acme.Client(api_key="sk-xxxx")
widget = client.widgets.get("wgt_abc123")
print(f"Widget: {widget.name}, Status: {widget.status}")
```

== JavaScript Example

The same operation in JavaScript:

```javascript
import { AcmeClient } from "@acme/sdk";

const client = new AcmeClient({ apiKey: "sk-xxxx" });
const widget = await client.widgets.get("wgt_abc123");
console.log(`Widget: ${widget.name}, Status: ${widget.status}`);
```

== Shell Example

Or use `curl` directly:

```bash
curl -H "Authorization: Bearer sk-xxxx" \
     https://api.example.com/v1/widgets/wgt_abc123
```

// ---- Raw blocks with #raw() ----
// The `#raw()` function gives programmatic control over raw
// text. You can set the language and block mode explicitly.

== JSON Response

#raw(lang: "json", block: true,
  "{\n  \"id\": \"wgt_abc123\",\n  \"name\": \"Weather Widget\",\n  \"status\": \"active\",\n  \"created_at\": \"2025-06-15T10:30:00Z\"\n}"
)

// ---- Inline math ----
// Wrap math in `$...$` (no spaces after/before the dollar
// signs) for inline rendering.

== Rate-Limit Formula

The API enforces rate limiting. Your effective request budget
is $R = min(R_"plan", R_"burst")$ requests per minute, where
$R_"plan"$ is your plan's base limit and $R_"burst"$ is the
burst allowance.

// ---- Display math ----
// Add a space after the opening `$` and before the closing
// `$` to produce a display-mode equation (centered, block).

== Latency Model

Expected response latency follows this model:

$ L(n) = L_0 + n / T + epsilon $

where:
- $L_0$ is the base latency (typically 20 ms)
- $n$ is the payload size in kilobytes
- $T$ is the throughput constant
- $epsilon$ represents network jitter

== Availability SLA

Acme guarantees an uptime of at least 99.95%. The maximum
allowed monthly downtime is:

$ D_"max" = 43200 times (1 - 0.9995) = 21.6 "seconds" $

// ---- More math features ----
// Fractions, subscripts, superscripts, and summation.

== Cost Calculation

The monthly cost for API usage is:

$ C = sum_(i=1)^(N) p_i times q_i $

where $p_i$ is the per-request price for tier $i$ and $q_i$
is the number of requests in that tier.
