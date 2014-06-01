using System.Web.Http;

using Clinical.API.App_Start;
using Clinical.API.Filters;
using Clinical.API.Models;
using Clinical.API.Repository;
using Clinical.API.Services;
using MongoDB.Bson.Serialization.Conventions;
using Newtonsoft.Json.Serialization;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace Clinical.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);

            GlobalConfiguration.Configuration.Formatters.Remove(
                GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            var container = new Container();

            this.Register(GlobalConfiguration.Configuration, container);

            this.AddFilters(GlobalConfiguration.Configuration);

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }

        private void Register(HttpConfiguration config, Container container)
        {
            container.Register<IMongoDatabaseProvider, MongoDatabaseProvider>();
            container.Register<IRepository<Goal>, GoalRepository>();
            container.Register<IRepository<User>, UserRepository>();
            container.Register<IRepository<Message>, MessageRepository>();
            container.Register<IMessageService, MessageService>();
        }

        private void AddFilters(HttpConfiguration config)
        {
            config.Filters.Add(new ModelValidationFilterAttribute());

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = 
                new CamelCasePropertyNamesContractResolver();

            var pack = new ConventionPack { new CamelCaseElementNameConvention() };

            ConventionRegistry.Register("camelCaseFields", pack, t => true);
        }
    }
}