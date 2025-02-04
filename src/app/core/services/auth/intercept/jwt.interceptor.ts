import { HttpInterceptorFn } from '@angular/common/http';  
// import { environment } from 'src/environments/environment'; // Adjust the import based on your environment setup.  

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {  
  const token = localStorage.getItem('token');  

  // Clone the request and set the Authorization header if the token exists  
  let clonedRequest = req.clone({  
    // The dbenv header is set based on your environment configuration  
    headers: req.headers.set('dbenv', "environment.apiEnv"),  
  });  

  if (token) {  
    clonedRequest = clonedRequest.clone({  
      headers: clonedRequest.headers.set('Authorization', `Bearer ${token}`),  
    });  
  }  

  return next(clonedRequest);  
};