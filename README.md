<h1>Securing WebSocket Communication </h1> 

<h3>Best Practices to secure WebSockets</h3>
<ul>
  <l1>Use 'wss' instead of 'ws'</l1>
  <li>Hard code the URL of the WebSockets endpoint</li>
  <li> Do not allow user-controllable data into the WebSocket URL</li>
  <li>Check origin against a whitelist: make sure the origin you are seeing is the one you expect</li>
  <li>Use CSRF tokens(random tokens) for sensitive data/actions</li>
  <li>Try to avoid session handling or access within the WebSocket protocol, handle it separately</li>
  <li>Use rate limiting: keep track of clients' web sockets to avoid too many connection attempts by the client</li>
</ul>

<h3>Detect or exploit WebSockets</h3>
<ul>
  <li>Manipulate websocket messages: XSS attack</li>
  <li>Manipulate Websocket handshake</li>
  <li>If Origin header verification is in place, check for broken verification.</li>
  <li>Communication takes place on 'ws' instead of 'wss'
</li>
  <li>WebSocket handshake relies on HTTP cookies (session) and no CSRF tokens are used. (WebSocket hijacking via CSRF vulnerability)
</li>
</ul>

<h3> Impact </h3>
<ul>
  <li>Utilize insecure web sockets to exploit other vulnerabilities.
</li>
  <li>An attacker can perform unauthorized actions as victim
</li>
  <li>An attacker can gain access to the sensitive data
</li>
<li>If the victim is an admin or a privileged user, the attacker can gain access over the entire web application </li>
</ul>

<h4>Notes:</h4>
<ul>
  <li>Browsers don't enforce SOP for websockets, hence the Origin header verification is necessary.</li>
</ul>
