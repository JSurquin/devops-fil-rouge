terraform {
  required_version = ">= 1.10.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "healthcheck_note" {
  filename = "${path.module}/generated-healthcheck.txt"
  content  = <<-EOT
    Fil rouge - ressource locale Terraform
    Endpoint attendu : http://127.0.0.1:3000/health
    Formation : Introduction au DevOps - 3 jours
  EOT
}

output "note_path" {
  value = local_file.healthcheck_note.filename
}
