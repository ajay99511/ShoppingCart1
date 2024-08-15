using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult Notfound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="This is a Bad Request"});
        }
        [HttpGet("un-authorized")]
        public ActionResult GetUnAuthorized()
        {
            return Unauthorized();
        }

        [HttpGet("validation-errors")]
        public ActionResult GetValidationErrors()
        {
            ModelState.AddModelError("Problem1","This is the first error");
            ModelState.AddModelError("problem2","This is the second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("this is a Server Error");
        }

    }
}