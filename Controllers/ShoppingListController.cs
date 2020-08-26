using Shopping.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Shopping.Controllers
{
    public class ShoppingListController : ApiController
    {
        // Create mock shopping lists
        public static List<ShoppingList> shoppingLists = new List<ShoppingList>
        {
            new ShoppingList() { Id = 0, Name = "Groceries",
                Items = {
                    new Item { Name = "MilkG"},
                    new Item { Name = "CornflakesG"},
                    new Item { Name = "StrawberriesG"}
                }
            },
            new ShoppingList() { Id = 1, Name = "Hardware"}
        };

        // GET: api/ShoppingList/5
        public IHttpActionResult Get(int id)
        {
            ShoppingList result = shoppingLists.FirstOrDefault(s => s.Id == id);

            if (result == null)
            {
                return NotFound();  // 404
            }
            return Ok(result);  // 200
        }

        // POST: api/ShoppingList
        public IHttpActionResult Post([FromBody]ShoppingList newList)
        {
            newList.Id = shoppingLists.Count;
            shoppingLists.Add(newList);

            return Ok(shoppingLists);
        }

    }
}
