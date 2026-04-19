package com.desafio.pedidos.service;

import com.desafio.pedidos.dto.ProdutoDTO;
import com.desafio.pedidos.exception.BusinessException;
import com.desafio.pedidos.exception.ResourceNotFoundException;
import com.desafio.pedidos.model.Categoria;
import com.desafio.pedidos.model.Produto;
import com.desafio.pedidos.repository.PedidoRepository;
import com.desafio.pedidos.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    @Autowired
    private CategoriaService categoriaService;
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Transactional
    public ProdutoDTO criarProduto(ProdutoDTO produtoDTO) {
        Categoria categoria = categoriaService.buscarCategoriaPorId(produtoDTO.getCategoriaId());
        
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidadeEmEstoque(produtoDTO.getQuantidadeEmEstoque());
        produto.setCategoria(categoria);
        
        Produto saved = produtoRepository.save(produto);
        return toDTO(saved);
    }
    
    @Transactional
    public ProdutoDTO editarProduto(Long id, ProdutoDTO produtoDTO) {
        Produto produto = buscarProdutoPorId(id);
        Categoria categoria = categoriaService.buscarCategoriaPorId(produtoDTO.getCategoriaId());
        
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidadeEmEstoque(produtoDTO.getQuantidadeEmEstoque());
        produto.setCategoria(categoria);
        
        Produto updated = produtoRepository.save(produto);
        return toDTO(updated);
    }
    
    public List<ProdutoDTO> listarProdutos() {
        return produtoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Busca por nome - busca parcial (case insensitive)
    public List<ProdutoDTO> buscarProdutoPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void excluirProduto(Long id) {
        Produto produto = buscarProdutoPorId(id);
        
        // Verificar se o produto já foi utilizado em pedidos
        boolean produtoEmPedidos = pedidoRepository.findAll().stream()
                .flatMap(pedido -> pedido.getItens().stream())
                .anyMatch(item -> item.getProduto().getId().equals(id));
        
        if (produtoEmPedidos) {
            throw new BusinessException("Não é possível excluir o produto pois ele já foi utilizado em pedidos. " +
                    "Recomendamos desativar o produto ou marcar como indisponível.");
        }
        
        produtoRepository.delete(produto);
    }
    
    public Produto buscarProdutoPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com ID: " + id));
    }
    
    public void atualizarEstoque(Long produtoId, Integer quantidadeVendida) {
        Produto produto = buscarProdutoPorId(produtoId);
        Integer novoEstoque = produto.getQuantidadeEmEstoque() - quantidadeVendida;
        
        if (novoEstoque < 0) {
            throw new BusinessException("Estoque insuficiente para o produto: " + produto.getNome());
        }
        
        produto.setQuantidadeEmEstoque(novoEstoque);
        produtoRepository.save(produto);
    }
    
    private ProdutoDTO toDTO(Produto produto) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setDescricao(produto.getDescricao());
        dto.setPreco(produto.getPreco());
        dto.setQuantidadeEmEstoque(produto.getQuantidadeEmEstoque());
        dto.setCategoriaId(produto.getCategoria().getId());
        dto.setCategoriaNome(produto.getCategoria().getNome());
        return dto;
    }
}