using System.Web.Http;
using System.Web.Http.Cors;

namespace Clinical.API.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.Routes.MapHttpRoute(
                name: "GoalsbyUser",
                routeTemplate: "api/user/{userId}/goal/{goalId}",
                defaults: new
                {
                    goalId = RouteParameter.Optional,
                    controller = "User",
                    action = "goal"
                });

            config.Routes.MapHttpRoute(
                name: "MessagesByGoal",
                routeTemplate: "api/goal/{goalId}/message/{messageId}",
                defaults: new
                {
                    messageId = RouteParameter.Optional,
                    controller = "Goal",
                    action = "message"
                });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            //config.EnableSystemDiagnosticsTracing();
        }
    }
}