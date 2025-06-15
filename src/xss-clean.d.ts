declare module 'xss-clean' {
    /**  
     * Returns an Express middleware that sanitizes user input against XSS attacks.  
     */
    function xssClean(): import('express').RequestHandler;
  
    export = xssClean;
  }
  