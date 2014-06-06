using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Clinica.API.Filters
{
    public class ModelValidationFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if(actionContext.ModelState.IsValid)
            {
                return;
            }

            var errors = new Dictionary<string, IEnumerable<string>>();

            foreach(var keyValue in actionContext.ModelState)
            {
                errors[keyValue.Key] = keyValue.Value.Errors.Select(e => e.ErrorMessage);
            }

            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, errors);
        }
    }
}