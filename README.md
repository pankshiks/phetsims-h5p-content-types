# phetsims-h5p-content-types

# Instruction to test this custom Balancing act content type.

1. This H5p content type will only work with Drupal 7 site.

2. Enabled the h5p module then go to its configuration page */admin/content/H5P*.

3. In H5P settings/configuration page and enable "H5P development mode" and "H5P development 	directory".

4. In your file folder go to sites/default/files/h5p/development and place this "H5P.balancingactsimulation"


The semantics and library.json files from these folders will now be read on every request, and the js, CSS and other files will also be read on every request.

5. Create a new Intereactive content type and Select the Balancing Simulation from Content type list.